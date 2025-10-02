import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemeCalculationComponent } from './scheme-calculation/scheme-calculation.component';
import { InvoiceDataComponent } from './invoice-data/invoice-data.component';

const routes: Routes = [
   { path: '', redirectTo: 'scheme-calculation', pathMatch: 'full' },
  { path: '', component: SchemeCalculationComponent, data: { extraParameter: 'scheme-calculation' } },
  { path: 'invoice-data', component: InvoiceDataComponent, data: { extraParameter: 'invoice-data' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemeCalculationRoutingModule { }
