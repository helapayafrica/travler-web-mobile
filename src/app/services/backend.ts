
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
// export const endpoint='http://api.ma3app.com/appApi';
// export const endpoint='http://bossapi.99synergy.com/appApi';
// export const endpoint = 'https://api.iabiri.com/globalApi'
export const endpoint = '/globalApi'


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {
  }
  private extractData(res: any) {
    const body = res;
    return body || {};
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  getCities(): Observable<any> {
    return this.http.post(endpoint + '/common/getCity', { "city_id": 0, "city_type": "source", }).pipe(
      map(this.extractData));
  }
  getDestinations(id: any): Observable<any> {
    return this.http.post(endpoint + '/common/getCity', { "city_id": id, "city_type": "destination" }).pipe(
      map(this.extractData));
  }

  getTrips(data: any): Observable<any> {
    return this.http.post(endpoint + '/Trips/filterBuses', data).pipe(
      map(this.extractData));

  }

  getBoardingDroping(data: any): Observable<any> {
    return this.http.post(endpoint + '/booking/getBoardingDroppingPoints', data).pipe(
      map(this.extractData));
  }
  bookingTicket(data: any): Observable<any> {
    return this.http.post(endpoint + '/Ticket/RoundBooking', data).pipe(
      map(this.extractData));
  }
  login(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/UserLogin', data).pipe(
      map(this.extractData));
  }
  otpVerification(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/UserOTPVerification', data).pipe(
      map(this.extractData));
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/OTPVerification', data).pipe(
      map(this.extractData));
  }


  sigup(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/RegisterUsers', data).pipe(
      map(this.extractData));
  }
  changePassword(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/ChangePassword', data).pipe(
      map(this.extractData));
  }
  paymentMethods(data: any): Observable<any> {
    return this.http.post(endpoint + '/booking/paymentMethod', data).pipe(
      map(this.extractData));
  }

  makePayment(data: any): Observable<any> {
    return this.http.post(endpoint + '/paymentGateway/init', data).pipe(
      map(this.extractData));
  }

  getNationality(): Observable<any> {
    return this.http.post(endpoint + '/common/GetNationality', {"sourcetype":"web"} ).pipe(
      map(this.extractData));
  }


  getOffers(): Observable<any> {
    return this.http.post(endpoint + '/common/getOffersList', {"currency_id":1,"sourcetype":"web"}).pipe(
      map(this.extractData));
  }

  getSeats(payload:any){
    return this.http.post(endpoint + '/trips/getTripSeatsPrice', payload).pipe(
      map(this.extractData));
  }
  getDroppingBoardingPoint(payload:any){
    return this.http.post(endpoint+"/trips/getBoardingDroppingPoints",payload).pipe(
      map(this.extractData));
  }

  sendOtp(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/GenerateOTP', data).pipe(
      map(this.extractData));
  }

  checkMpesaPayment(data: any): Observable<any> {
    return this.http.post(endpoint + '/paymentGateway/checkMpesaPayment', data).pipe(
      map(this.extractData));
  }
}
