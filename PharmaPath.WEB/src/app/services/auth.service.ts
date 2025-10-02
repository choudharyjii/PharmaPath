import { Injectable } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, SsoSilentRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { LoginRequest } from '../model/login-request';
import { CommonUtility } from '../shared/common-utility';
import { AuthenticationTypeEnum } from '../shared/common-enums';
import { Employee } from '../model/employee-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private readonly _destroying$ = new Subject<void>();
  private activeUserAccount?: any;
  public hideSideBar: boolean = true;
  public displayMenu: boolean = false;
  WebVersion: String = '1.0.0.0';
  currentyear = new Date().getFullYear()

  constructor(private common: CommonService, private router: Router,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) {
  }

  getActiveLoggedInUser(): any {

    if(this.getAuthType() == AuthenticationTypeEnum.SingleSignOn){
    // get if user logged as SSO
    this.activeUserAccount = this.authService.instance.getActiveAccount();
    if (this.activeUserAccount && this.authService.instance.getAllAccounts().length > 0) {
            this.activeUserAccount = this.authService.instance.getAllAccounts()[0];
            this.authService.instance.setActiveAccount(this.activeUserAccount);
    }
    else {
      this.logout();
    }
    
  }
  else if(this.getAuthType() == AuthenticationTypeEnum.UsernameAndPassword){
    // get if user logged as username and password
    if(this.activeUserAccount == null)
      {
        let currentLoggedUser =  this.getCurrentLoggedUser();
        if(!CommonUtility.isNullOrUndefined(currentLoggedUser)){
          this.activeUserAccount = JSON.parse(currentLoggedUser);
        }
      }
      else {
        this.logout();
      }
  }

  else {
    this.logout();
  }

    return this.activeUserAccount;
  }

  loginPopup(): void {
    this.authService.loginPopup();
  }

  logout(): void {
    if(this.getAuthType() == AuthenticationTypeEnum.SingleSignOn){
      this.removeAccessToken();
      this.authService.logout();
    }
    else{
      setTimeout(() => {
      this.removeAccessToken();
      this.router.navigateByUrl('auth/login')
    }, 100);
    }
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem('AccessToken', accessToken);
  }

  setAuthType(AuthType : number){
    localStorage.setItem('AuthType', AuthType.toString());
  }

  getAuthType(): any {
    return localStorage.getItem('AuthType');
  }

  getAccessToken(): any {
    return localStorage.getItem('AccessToken');
  }

  getCurrentLoggedInUserId(): any {
    return localStorage.getItem('currentUserId');
  }

  getCurrentLoggedUser() : any {
    return localStorage.getItem('CurrentUser');
  }
  
  removeAccessToken(): any {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('currentUserCode');
    localStorage.removeItem('AuthType');
    this.activeUserAccount = null;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  isUserAuthenticated(): boolean {
    let activeUser = this.getActiveLoggedInUser() as AccountInfo;
    return !(activeUser === null
      || activeUser === undefined);
  }

  authenticateUser(loginRequest: LoginRequest) {
    loginRequest.ipAddress = '192.168.1.1';

    if (loginRequest.authenticationType == AuthenticationTypeEnum.UsernameAndPassword && (CommonUtility.isNullOrUndefinedOrEmpty(loginRequest.username) || CommonUtility.isNullOrUndefinedOrEmpty(loginRequest.password))) {
      this.common.showWarning("Username and Password required!");
    }
    else {
      this.common.authenticateUser(loginRequest).subscribe(res => {
        if (!CommonUtility.isNullOrUndefinedOrEmpty(res)) {
          localStorage.setItem('AccessToken', res.userName);
          localStorage.setItem('currentUserCode', res.userCode)
          // localStorage.setItem('currentUserId', res.id);
          localStorage.setItem('CurrentUser',JSON.stringify(res));
          this.router.navigateByUrl('/scheme-calculation/invoice-data');
        }
        else {
          this.common.showError("User login failed! Check your username or password.");
        }
      });
    }
  }
  checkUserAccessByPermission(permisionCode : string)
	{
		let activeAccount = this.getCurrentLoggedUser();
    var loggedUser:Employee = JSON.parse(activeAccount);
		if(!CommonUtility.isNullOrUndefined(activeAccount)){
      var availablePerssions : any = loggedUser.rolePermissionDetails.filter(x => x.permissionCode == permisionCode);
      if(availablePerssions)
			return 	availablePerssions.length > 0;
		}
		return false;
	}

	checkUserAccessByRole(roleCode : any)
	{
		let activeAccount = this.getCurrentLoggedUser();
    var loggedUser:Employee = JSON.parse(activeAccount);
		if(!CommonUtility.isNullOrUndefined(activeAccount)){
			var availablePerssions : any = loggedUser.rolePermissionDetails.find(x => x.roleId == roleCode);
			if(availablePerssions != undefined)
        return 	true;
		}
		return false;
	}

  checkUserRole()
	{
let activeAccount = this.getCurrentLoggedUser();
  var loggedUser:Employee = JSON.parse(activeAccount);
if(!CommonUtility.isNullOrUndefined(activeAccount)){
	return loggedUser.userRoles.map(x => x.roleId);
}
  return [];
	}

  getCurrentLoggedInUserCode(): any {
    return localStorage.getItem('currentUserCode');
  }
}