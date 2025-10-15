import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
export const endpoint = '/globalApi'


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {
  }
  private extractData(res: any) {
    return res || {};
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
    // console.log('[Data from payload]', data)
    return this.http.post(endpoint + '/Trips/filterBuses', data).pipe(
      map(this.extractData));

  }

  getBoardingDropping(data: any): Observable<any> {
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


  signup(data: any): Observable<any> {
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

  forgotPassword(data: any){
    return this.http.post(endpoint + '/AppUser/ForgotPassword', data).pipe(
      map(this.extractData)
    )
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

  getFilterOptions(data:any){
    return this.http.post(endpoint + '/trips/getFilterOptions',data).pipe(
      map(this.extractData));
  }

  getUserWalletData(userId: string, currencyId: number=1){

    // const data = {userId, currencyId, sourcetype:"web"}
    // const data = {userId:userId,currencyId,sourcetype:"web"}
    const data = {userId:userId,currencyId,sourcetype:"web"}

    console.log(data)
    return this.http.post(endpoint + '/UserWallet/GetWalletData',data).pipe()
  }

  getWalletHistoryData(userId: string, currencyId: number=1, page=1, perPage=10){
    const data = {userId,currencyId,perPage,page,sourcetype:"web"}
    return this.http.post(endpoint + '/UserWallet/GetWalletHistory',data).pipe()
  }

  getBookingHistory(tripType: 'upcoming' | 'completed' = 'upcoming') {
    const data = {tripType,sourcetype:"web"}
    return this.http.post(endpoint + '/ticket/bookingHistory',data).pipe()
  }

  getOfferList(currencyId: number=1){
    const data = {currency_id:1,sourcetype:"web"}
    return this.http.post(endpoint + '/common/getOffersList',{"currency_id":1,"sourcetype":"web"}).pipe(
      map(this.extractData));
  }

  // rescehdule
  // FIXME:   change to match backend
  rescheduleTicket(data: any): Observable<any> {
    return this.http.post(endpoint + '/Ticket/RescheduleTicket', data).pipe(
      map(this.extractData));
  }

  resetPassword(data: any) {
    return this.http.post(endpoint + '/AppUser/ChangeForgotPassword', data).pipe(
      map(this.extractData)
    )

  }

  today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  getCommissionReport(
    page?:string,
    perPage: number = 10,
    currencyId: string = "1",
    agentId: any = null,
    startData = this.today,
    endDate = this.today,
  ) {

    const data = {
      page,
      perPage: String(perPage),
      currencyId: String(currencyId),
      agentId,
      startDate: startData,
      endDate: endDate,
      sourcetype: "web"
    }

    return this.http.post(endpoint + '/agency/getCommissionReport', data).pipe(
      map(this.extractData)
    )
  }
  getCurrencyList() {
    return this.http.get(endpoint + '/common/getCurrencyList').pipe(
      map(this.extractData)
    )
  }

  getAllSubAgentList( page?:string,
                      perPage: number = 10,
                      currencyId: string = "1",
                      agentId: any = null,
                      startData = this.today,
                      endDate = this.today,) {
    const data = {
      page,
      perPage: String(perPage),
      currencyId: String(currencyId),
      agentId,
      startDate: startData,
      endDate: endDate,
      sourcetype: "web"
    }
    return this.http.post(endpoint + '/agency/getAllSubAgentList', {data}).pipe(      map(
      this.extractData
    ))

  }

  getCounties() {
    return this.http.get((endpoint + '/common/getCounty')).pipe(
      map(this.extractData)
    )
  }

  updateProfile(payload: any){
    return this.http.post(endpoint + "/appUser/Update", payload).pipe(
      map(this.extractData)
    )
  }
}
