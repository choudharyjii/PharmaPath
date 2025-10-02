import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { SharedModule } from './modules/shared.module';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './common/widgets/title/title.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent, MsalInterceptorConfiguration, MsalGuardConfiguration, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG } from "@azure/msal-angular";
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { CommonUtility } from './shared/common-utility';
import { BusySpinnerComponent } from './common/busy-spinner/busy-spinner.component';
import { LoaderInterceptor } from './common/api-interceptor/APIInterceptor';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { ErrorInterceptor } from './common/api-interceptor/ErrorInterceptor';
import { SchemeCalculationComponent } from './main/scheme-calculation/scheme-calculation/scheme-calculation.component';


export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '23810362-c4b6-45be-a595-3aef45a6245d', //AD app in LBE tenant
      authority: 'https://login.microsoftonline.com/aa1a3684-7926-4b10-843a-1ed30d842059',
      redirectUri: window.location.origin
      //postLogoutRedirectUri: '/'
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  const scopes = [
                  'user.read', 
                  'api://07900de2-9da7-4899-abe6-245b96d61bf3/adc.api'
                ];
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  protectedResourceMap.set('http://localhost:4200/about', ['api://07900de2-9da7-4899-abe6-245b96d61bf3/adc.api']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  const scopes = [
                  'user.read', 
                  'api://07900de2-9da7-4899-abe6-245b96d61bf3/adc.api'];
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...scopes]
    }
    //loginFailedRoute: '/login-failed'
  };
}

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent, MsalRedirectComponent], imports: [BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        SharedModule,
        MsalModule,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        MainComponent,
        DashboardComponent,
        TitleComponent,
        BusySpinnerComponent,
        ConfirmDialogComponent], providers: [
        {
            provide: MAT_DATE_LOCALE, useValue: 'en-GB'
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService,
        CommonUtility,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
