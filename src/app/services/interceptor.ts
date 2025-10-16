import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Config } from './config';
import { BookingService } from './booking';
export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const configService = inject(Config);
  const service = inject(BookingService);
  // const token = configService.getConfig('token');
  let data: any = req.body;
  // data.token = token
  // console.log('[Interceptor]')

  if (req.url.endsWith('ChangePassword')) {
    // req = req.clone({ headers: req.headers.set('Authorization',JSON.parse(sessionStorage.getItem('loggedUser')).api_token),body:data});
  } else if (req.url.endsWith('json')) {
  } else {
    // req = req.clone({ headers: req.headers.set('Authorization', '4F5D3QC5-C94A-CFD5-87C1-4E2903311DF0'),body:data});
    const userData: any = service.getConfig('userData');
    if (userData) {
      const token = userData.api_token;
      console.log('USER DATTTAAAA');
      console.log(token);
      req = req.clone({ headers: req.headers.set('Authorization', token), body: data });
    } else {
      req = req.clone({
        headers: req.headers.set('Authorization', '4F5D3QC5-C94A-CFD5-87C1-4E2903311DF0'),
        body: data,
      });
    }
  }
  return next(req);
};
