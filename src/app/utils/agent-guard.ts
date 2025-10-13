import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {BookingService} from '../services/booking';

export const agentGuard: CanActivateFn = (route, state) => {
  const bookingService = inject(BookingService);
  const userData : any =  bookingService.getConfig('userData');
  const router = inject(Router);
  if (!userData) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
  if(userData.agentDetails){
    return true
  }
  return router.createUrlTree(['/user-profile/bookings'], {
    queryParams: { returnUrl: state.url }
  });
};
