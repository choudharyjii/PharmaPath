import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
        //canActivate : [MsalGuard]
      },

      {
        path: 'dashboard', component: DashboardComponent, data: { extraParameter: 'dashboard' },
        //  canActivate : [MsalGuard]
      },
      { path: 'scheme-calculation', loadChildren: () => import('./main/scheme-calculation/scheme-calculation.module').then(m => m.SchemeCalculationModule), data: { extraParameter: 'scheme-calculation' } }
    ]
  },
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), data: { extraParameter: '' } },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
