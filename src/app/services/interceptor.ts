import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { BookingService } from './booking';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  // Skip authorization for JSON files
  if (req.url.endsWith('json')) {
    return next(req);
  }

  const service = inject(BookingService);
  const userData: any = service.getConfig('userData');
  const token = userData?.api_token || '4F5D3QC5-C94A-CFD5-87C1-4E2903311DF0';

  // Clone request with Authorization header
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', token)
  });

  return next(clonedReq);
};
