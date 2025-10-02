import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CommonService } from 'src/app/services/common.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-spinner',
    templateUrl: './busy-spinner.component.html',
    styleUrls: ['./busy-spinner.component.scss'],
    imports: [MatProgressSpinner, AsyncPipe]
})
export class BusySpinnerComponent {

  isLoading: Subject<boolean> = this.common.isLoading;
  constructor(public common:CommonService){}
}
