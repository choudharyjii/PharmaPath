import { Component } from '@angular/core';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from '../common/widgets/title/title.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { HeaderComponent } from '../common/header/header.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports: [HeaderComponent, SidebarComponent, TitleComponent, RouterOutlet, FooterComponent]
})
export class MainComponent {

}
