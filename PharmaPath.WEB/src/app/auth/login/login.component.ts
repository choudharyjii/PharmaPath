import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, SsoSilentRequest } from '@azure/msal-browser';
import { Subject, filter, isEmpty, takeUntil } from 'rxjs';
import { LoginRequest } from 'src/app/model/login-request';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationTypeEnum } from 'src/app/shared/common-enums';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ReactiveFormsModule, FormsModule]
})
export class LoginComponent implements OnInit, OnDestroy  {

  isUserAuthenticated = false;
  private readonly _destroying$ = new Subject<void>();
  loginRequest : LoginRequest= new LoginRequest();

  constructor(private router: Router,
    private msalService: MsalService,
    public authService: AuthService,
    private msalBroadcastService: MsalBroadcastService) {
    }

  ngOnInit(): void {

    if(this.authService.getAccessToken() == null)
    {
      this.msalBroadcastService.inProgress$
          .pipe(
            filter((staus: InteractionStatus) => staus === InteractionStatus.None)
            ,takeUntil(this._destroying$)
          )
          .subscribe(() =>{
            this.setUserAutheticationStatus();
          });

      this.msalBroadcastService.msalSubject$
          .pipe(
            filter((message: EventMessage) => message.eventType === EventType.LOGIN_SUCCESS)
            ,takeUntil(this._destroying$)
            )
            .subscribe((message: EventMessage) => {
              const authResult = message.payload as AuthenticationResult;
              localStorage.setItem('AccessToken',authResult.account.username);
              this.msalService.instance.setActiveAccount(authResult.account);
            }
            )
    }
    else{
      this.router.navigateByUrl('/dashboard');
      }
  }



  login():void {
    this.loginRequest.authenticationType = AuthenticationTypeEnum.UsernameAndPassword;
    this.authService.setAuthType(this.loginRequest.authenticationType);
    this.authService.authenticateUser(this.loginRequest);
  }

  SSOLogin() {
    this.loginRequest.authenticationType = AuthenticationTypeEnum.SingleSignOn;
    this.authService.setAuthType(this.loginRequest.authenticationType);
    this.msalService.loginPopup();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  setUserAutheticationStatus():void{
    let activeAccount = this.msalService.instance.getActiveAccount();
    if(!activeAccount && this.msalService.instance.getAllAccounts().length > 0){
      activeAccount = this.msalService.instance.getAllAccounts()[0];
      this.msalService.instance.setActiveAccount(activeAccount);
    }
    this.isUserAuthenticated = !!activeAccount;
    if(this.isUserAuthenticated)
    {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
