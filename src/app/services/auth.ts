import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {BookingService} from './booking';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInKey = 'loggedInStatus';
  private userKey = 'userData';

  private loggedInSubject: BehaviorSubject<boolean>;
  private userSubject: BehaviorSubject<any | null>;

  cookies = inject(CookieService)
  bookingsService = inject(BookingService)

  constructor() {
    // ✅ Load logged-in status from localStorage
    // const storedStatus = localStorage.getItem(this.loggedInKey);
    const storedStatus:any = this.bookingsService.getConfig(this.loggedInKey);
    // console.log('testing',storedStatus);
    this.loggedInSubject = new BehaviorSubject<boolean>(storedStatus === 'true');

    // ✅ Load user data from localStorage
    let storedUser: any = null;

    if (this.userKey) {
      // const raw = localStorage.getItem(this.userKey);
      const raw = this.bookingsService.getConfig(this.userKey);
      // if (raw && raw !== 'undefined') {
      //   try {
      //     storedUser = JSON.parse(raw);
      //   } catch (e) {
      //     console.error('Invalid JSON in localStorage:', e);
      //   }
      // }
    }

    this.userSubject = new BehaviorSubject<any | null>(storedUser);
  }

  /** ✅ Return login status as an Observable */
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  /** ✅ Return user details as an Observable */
  get user$(): Observable<any | null> {
    return this.userSubject.asObservable();
  }

  /** ✅ Login: Store user info & update login status */
  login(user: any) {
    // localStorage.setItem(this.loggedInKey, 'true');
    this.bookingsService.setConfig(this.loggedInKey,'true');
    // localStorage.setItem(this.userKey, JSON.stringify(user))
    this.bookingsService.setConfig(this.userKey,user);

    console.log(user)
    // add the user email and to the cookies

    this.cookies.set('userEmail', user.email, {
      expires: 7,
      secure: true,
      sameSite: 'Strict'
    });


    this.loggedInSubject.next(true);
    this.userSubject.next(user);
  }

  /** ✅ Logout: Clear localStorage & update Observables */
  logout() {
    // localStorage.removeItem(this.loggedInKey);
    this.bookingsService.removeConfig(this.loggedInKey)
    // localStorage.removeItem(this.userKey);
    this.bookingsService.removeConfig(this.userKey)

    this.loggedInSubject.next(false);
    this.userSubject.next(null);
  }

  /** ✅ Get current user */
  getCurrentUser(): any | null {
    return this.userSubject.value;
  }
}
