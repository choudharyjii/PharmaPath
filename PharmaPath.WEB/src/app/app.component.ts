import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'mahyco';
  constructor(private common: CommonService, private router: Router) {
    // if (common.isLoginPage) {
    //   router.navigateByUrl('auth/login');
    // }
  }
}
