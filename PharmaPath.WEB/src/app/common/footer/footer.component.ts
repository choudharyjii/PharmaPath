import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true
})
export class FooterComponent {

  footerData: any;
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
}
