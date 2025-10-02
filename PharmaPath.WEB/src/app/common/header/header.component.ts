import { Component, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ThemeSetting } from 'src/app/theme-settings/theme-setting';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/model/user-profile';
import { AuthService } from 'src/app/services/auth.service';
import { CommonUtility } from 'src/app/shared/common-utility';
import { AuthenticationTypeEnum, UserRoleEnum } from 'src/app/shared/common-enums';
import { LoginRequest } from 'src/app/model/login-request';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true
})
export class HeaderComponent {
  userProfile: UserProfile = new UserProfile();

  imgPath = '';
  constructor(public theme: ThemeSetting
    , private elRef: ElementRef
    , private common: CommonService
    , private authService: AuthService
    , private commonUtil: CommonUtility
    , private router: Router) {
    this.imgPath = common.imgPath;
    this.setLoggedInUserDetails();
    // this.toggleSidebar()
  }

  toggleSidebar() {
    this.theme.sidebar = !this.theme.sidebar;
    this.elRef.nativeElement = document.getElementsByTagName('body')[0];
    this.elRef.nativeElement.classList.toggle('slide');
    this.common.hiddenSideBar = !this.common.hiddenSideBar;
  }

  setLoggedInUserDetails(): void {
    let activeAccount = this.authService.getActiveLoggedInUser();
    if(activeAccount != null){
      if(this.authService.getAuthType() == AuthenticationTypeEnum.SingleSignOn){
        this.common.getEmployeeDetailsByUserMailId(activeAccount.username).subscribe(res => {
          // this.common.getEmployeeDetailsByUserMailId('simran.chand@mahyco.com').subscribe(res => {
            localStorage.setItem('AccessToken', res.userName);
            localStorage.setItem('currentUserCode', res.userCode)
            // localStorage.setItem('currentUserId', res.id);
            localStorage.setItem('CurrentUser',JSON.stringify(res));
            this.authService.hideSideBar = this.authService.checkUserRole().length > 0 ? true : false;
             const value: number[] = this.authService.checkUserRole();
                const role = value.find( x => x == UserRoleEnum.Admin);
                if(role == undefined){
                  this.authService.displayMenu = true;
                }

          this.userProfile = {
          displayName: !CommonUtility.isNullOrUndefined(res.displayName) ? res.displayName : res.displayName,  
          userName: !CommonUtility.isNullOrUndefined(res.userName) ? res.userName : res.userName,
          userCode: !CommonUtility.isNullOrUndefined(res.userCode) ? res.userCode : res.userCode,
          emailId: !CommonUtility.isNullOrUndefined(res.username) ? res.username : res.emailId,
          }
        });
      }
    
      if (!CommonUtility.isNullOrUndefined(activeAccount)) {
        this.userProfile = {
          displayName: !CommonUtility.isNullOrUndefined(activeAccount.displayName) ? activeAccount.displayName : activeAccount.displayName,  
          userName: !CommonUtility.isNullOrUndefined(activeAccount.userName) ? activeAccount.userName : activeAccount.userName,
          userCode: !CommonUtility.isNullOrUndefined(activeAccount.userCode) ? activeAccount.userCode : activeAccount.userCode,
          emailId: !CommonUtility.isNullOrUndefined(activeAccount.username) ? activeAccount.username : activeAccount.emailId,
          // displayName: !CommonUtility.isNullOrUndefined(activeAccount.employeeName) ? activeAccount.employeeName : activeAccount.name,
          // userCode: !CommonUtility.isNullOrUndefined(activeAccount.username) ? activeAccount.username : activeAccount.emailId,
        }
    }
  }
  else {
    this.logout();
  }
  }

  logout() {
    this.authService.logout();
    this.authService.removeAccessToken();
    // this.userProfile = new UserProfile();
    // setTimeout(() => {
    //   this.router.navigateByUrl('auth/login')
    // }, 100);
  }
}
