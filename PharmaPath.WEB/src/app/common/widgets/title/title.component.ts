import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
    imports: [NgClass]
})
export class TitleComponent implements OnInit {

  displayData: any;
  constructor(private common: CommonService, private router: Router) {
    this.common.title.subscribe(res => {
      this.displayData = res;
    })
  }

  ngOnInit(): void {
  }
  goToHome(){
    this.router.navigate(['dashboard']);
  }
}
