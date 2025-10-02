import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Division, Month } from 'src/app/model/Scheme-Calculation-ddl';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-invoice-data',
  imports: [ReactiveFormsModule, FormsModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatOptionModule,CommonModule,MatButtonModule],
  templateUrl: './invoice-data.component.html',
  styleUrl: './invoice-data.component.scss'
})
export class InvoiceDataComponent {
  DivisionNameList:Division[] = [];
  MonthNameList:Month[]=[];
  year: number[] = [];
  DivisionSpName:string='FSC.sp_DevisionDtl';
  MonthSpName:string='FSC.sp_month_name';

  constructor(private route: ActivatedRoute, private common: CommonService, private router: Router, private authService: AuthService) {
    this.common.title.next({ title: 'Invoice Data', icon: 'fa-tachometer-alt' })
  }

  ngOnInit(): void {
    this.getSchemeCalculationDDL();
    // this.populateYears();
  }

  getSchemeCalculationDDL() {
    this.common.getCommonDDLList(this.DivisionSpName).subscribe(res => {
      this.DivisionNameList = JSON.parse(res.trim()) as Division[]; 
    });
    this.common.getCommonDDLList(this.MonthSpName).subscribe(res => {
      this.MonthNameList = JSON.parse(res.trim()) as Month[]; 
    });
  }

  // populateYears() {
  //   const currentYear = new Date().getFullYear();
  //   this.year = [currentYear, currentYear - 1, currentYear - 2];
  // }
}
