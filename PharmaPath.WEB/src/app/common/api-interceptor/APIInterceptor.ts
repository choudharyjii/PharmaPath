import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private common: CommonService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     this.common.showBusySpinner();

     return next.handle(request).pipe(
           finalize(() => this.common.hideBusySpinner()),
     );
  }
}
