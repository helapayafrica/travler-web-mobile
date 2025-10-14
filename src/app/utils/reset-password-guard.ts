import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {BookingService} from '../services/booking';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const bookingService = inject(BookingService);
  const forgotPasswordDetails:any = bookingService.getConfig('forgotPasswordDetails');
  const router = inject(Router)
  if(!forgotPasswordDetails){
    bookingService.setConfig('forgotPasswordDetails', {})
    return router.navigate(['/forgot-password']);
  }
  const date = forgotPasswordDetails.date;
  if(!date){
    bookingService.setConfig('forgotPasswordDetails', {})
    return router.navigate(['/forgot-password']);
  }

  // check the date if expired
  const expiryTime = 15 * 60 * 1000; // 15 minutes in milliseconds
  const currentTime = new Date().getTime();
  const savedTime = new Date(date).getTime();

  if (currentTime - savedTime > expiryTime) {
    bookingService.setConfig('forgotPasswordDetails', {});
    return router.navigate(['/forgot-password']);
  }

  return true;
};
