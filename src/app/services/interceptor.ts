import {HttpInterceptorFn, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Config } from './config';
import { BookingService } from './booking';
import {AuthService} from './auth'; // import your service

export const httpInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  const configService = inject(Config);
  const bookingService = inject(BookingService);
  const accountService = inject(AuthService);

  const userData: any = bookingService.getConfig('userData');
  const token = userData?.api_token || '4F5D3QC5-C94A-CFD5-87C1-4E2903311DF0';
  req = req.clone({ headers: req.headers.set('Authorization', token) });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        accountService.logout();
        window.location.reload();
      }
      return throwError(() => error);
    }),
  );
};
