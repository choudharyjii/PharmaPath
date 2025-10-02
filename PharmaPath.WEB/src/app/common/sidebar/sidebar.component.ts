import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event, RouterLinkActive, RouterLink } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { NavItem } from 'src/app/model/interfaces.main';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserRoleEnum } from 'src/app/shared/common-enums';
import { ThemeSetting } from 'src/app/theme-settings/theme-setting';
import { MatTooltip } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [NgClass, MatTooltip, RouterLinkActive, RouterLink]
})
export class SidebarComponent {
  public activePage: any;
  navItems: NavItem[] = [];
  currentActiveModule = '';
  subscriptions: Subscription[] = [];
  // displayMenu: boolean = false;
  roles: number[] = [];

  constructor(private activatedRoute: ActivatedRoute
    , private router: Router
    , public common: CommonService
    , public authService: AuthService, public theme: ThemeSetting
    , private elRef: ElementRef) { }

  ngOnInit(): void {
    // const value: number[] = this.authService.checkUserRole();
    // const role = value.find( x => x == UserRole.Admin);
    // if(role == undefined){
    //   this.displayMenu = true;
    // }
    this.getMenus();
    this.activePage = this.activatedRoute.snapshot.firstChild?.data['extraParameter'];
    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.setfooterHeight();
          this.activateMainLink();
        }
      })
    )
  }

  activateMainLink() {
    this.activePage = this.activatedRoute.snapshot.firstChild?.data['extraParameter'];
  }

  loopInChild(children: any) {
    var val;
    for (let i = 0; i < children.length; i++) {
      if (children[0].children.length === 1) {
        this.loopInChild(children[0].children)
      } else {
        val = children[0].data['extraParameter'];
        break
      }
    }
    return val;
  }

  async getMenus() {

    //let activeAccount = this.authService.getActiveLoggedInUser();
    // let currentUserName = this.authService.getAccessToken();
    // let currentUserName = 'admin'; //hardCode User Name
    // if(!CommonUtility.isNullOrUndefined(currentUserName)){
    //   this.common.getUserAuthorisedMenusByUserName(currentUserName).subscribe((res) => {
    //     this.navItems = res.siteMenu;

    //   });

    //   let loginRequest = {
    //     username:currentUserName,
    //     authenticationType: AuthenticationTypeEnum.SingleSignOn
    //   };
    // }

    const data: any = await lastValueFrom(this.common.getAPICall());
    this.navItems = data.menu;
    this.setfooterHeight();
    setTimeout(() => {
      this.roles = this.authService.checkUserRole();
    }, 1000);
  }

  setfooterHeight() {
    setTimeout(() => {
      const main = document.getElementsByClassName('app-main')[0];
      const footer = document.getElementById('mainFooter');
      if (footer) {
        main.setAttribute("style", "padding-bottom:" + footer?.offsetHeight + "px")
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  toggleSidebar() {
    this.theme.sidebar = !this.theme.sidebar;
    this.elRef.nativeElement = document.getElementsByTagName('body')[0];
    this.elRef.nativeElement.classList.toggle('slide');
    // this.common.hiddenSideBar = true;
  }

  displayMenu(code?: string) {
    if (this.roles.find(x => x == UserRoleEnum.RBM)) {
      if(code == 'C103')
        return false;
      else
      return true;
    }
    else if (this.roles.find(x => x == UserRoleEnum.TBM)){
      if(code == 'C101' || code == 'C102')
        return false;
      else
      return true;
    }
    else if (this.roles.find(x => x == UserRoleEnum.Admin)){
      return false;
    }
    else {
      return true;
    }
    return false;
  }
}
