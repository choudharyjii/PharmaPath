import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../modules/material.module';
import { SharedModule } from '../modules/shared.module';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        AuthComponent,
        LoginComponent
    ]
})
export class AuthModule { }