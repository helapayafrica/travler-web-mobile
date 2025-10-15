import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {BackendService} from '../services/backend';
import {BookingService} from '../services/booking';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(BookingService);
  const router  = inject(Router);

  const status   = service.getConfig('loggedInStatus');
  const bookingService = inject(BookingService);
  const userData:any = service.getConfig('userData');

  // if not logged in or missing userData -> redirect
  if (!status || !userData) {
    // preserve the intended URL if you like
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
  if(userData.agentDetails){
    bookingService.setConfig('isAgent', true)
  }else{
    bookingService.setConfig('isAgent', false)
  }
  return true; // allow navigation
};
