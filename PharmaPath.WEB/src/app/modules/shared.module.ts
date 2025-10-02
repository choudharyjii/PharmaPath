import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FileUploadComponent } from '../common/widgets/file-upload/file-upload.component';
import { CommonModule, DatePipe } from '@angular/common';
import { PreventScroll } from '../directive/prevent-number-scroll';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadComponent,
        PreventScroll,
    ],
    imports: [
        FormsModule,
        MaterialModule,
        CommonModule,
        GoogleMapsModule,
        FileUploadComponent,
        PreventScroll
    ],
    providers: [
        DatePipe
    ]
})
export class SharedModule { }