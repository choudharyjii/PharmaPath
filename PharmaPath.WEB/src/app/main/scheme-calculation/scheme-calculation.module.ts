import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeCalculationRoutingModule } from './scheme-calculation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { SchemeCalculationComponent } from './scheme-calculation/scheme-calculation.component';
import { InvoiceDataComponent } from './invoice-data/invoice-data.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SchemeCalculationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    SchemeCalculationComponent,
    InvoiceDataComponent
  ]
})
export class SchemeCalculationModule { }
