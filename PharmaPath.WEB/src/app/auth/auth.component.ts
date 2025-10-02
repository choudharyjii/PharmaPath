import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    imports: [RouterOutlet]
})
export class AuthComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();
  
  constructor(private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { 
    
  }

  ngOnInit(): void {
  }

}
