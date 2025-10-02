import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true
})
export class DashboardComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();
  
  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  cardList: any[] = [];
  constructor(private common: CommonService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) {
    setTimeout(() => {
      this.common.title.next({ title: 'Dashboard', icon: 'fa-tachometer-alt' });
    });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(`this.msalBroadcastService.msalSubject$ : ${result}`);
      });

      this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        console.log(`subscribe event......`);
      });

  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
