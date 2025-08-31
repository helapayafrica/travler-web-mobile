import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';

export const endpoint = 'https://api.iabiri.com/appApiV1'

@Injectable({
  providedIn: 'root'
})
export class BackendService  {

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
    return this.http.post(endpoint + '/booking/filterBuses', data).pipe(
      map(this.extractData));

  }

  getBoardingDroping(data: any): Observable<any> {
    return this.http.post(endpoint + '/booking/getBoardingDroppingPoints', data).pipe(
      map(this.extractData));
  }
  bookingTicket(data: any): Observable<any> {
    return this.http.post(endpoint + '/booking/Save', data).pipe(
      map(this.extractData));
  }
  login(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/LoginUsers', data).pipe(
      map(this.extractData));
  }
  otpVerification(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/UserOTPVerification', data).pipe(
      map(this.extractData));
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/UserOTPVerification', data).pipe(
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
  getLocation(): Observable<any> {
    return this.http.post(endpoint+'/common/getLocation',{}).pipe(
      map(this.extractData));
  }


  // getCurrencies(): Observable<any> {
  //   return this.http.get(endpoint+'/common/getCurrencyList').pipe(
  //     map(this.extractData));
  // }

  getOffers(): Observable<any> {
    return this.http.post(endpoint + '/common/getOffersList', {"currency_id":1,"sourcetype":"web"}).pipe(
      map(this.extractData));
  }


  getSeats(payload:any){
    return this.http.post(endpoint + '/booking/getTripSeatsPrice', payload).pipe(
      map(this.extractData));
  }
  getDroppingBoardingPoint(payload:any){
    return this.http.post(endpoint+"/booking/getBoardingDroppingPoints",payload).pipe(
      map(this.extractData));
  }

  sendOtp(data: any): Observable<any> {
    return this.http.post(endpoint + '/AppUser/RegisterUsers', data).pipe(
      map(this.extractData));
  }

  checkMpesaPayment(data: any): Observable<any> {
    return this.http.post(endpoint + '/paymentGateway/checkMpesaPayment', data).pipe(
      map(this.extractData));
  }
}
