import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CryptoService} from './core/crypto-service';

@Injectable({
  providedIn: 'root'
})
export class BookingService{
  private selectedTabKey = 'selectedTab'; // Key for localStorage
  private selectedTabSubject: BehaviorSubject<string>;
  public selectedTab$: Observable<string>;
  // private referenceNumber = new BehaviorSubject<string | null>(this.getStoredReference());
  private referenceNumber: BehaviorSubject<string | null>;
  referenceNumber$
  private storage :Storage// Change to sessionStorage if neede
  private storageKey = 'tripDetails';
  payload:any={
    "source_city_id": "",
    "destination_city_id": "",
    "travel_date": "",
    "avg_rating": null,
    "departure_time": null,
    "fare": null,
    "seat_type": "",
    "travels": "",
    "boarding_points": [],
    "dropping_points": [],
    "bus_with_amenities": [],
    "high_rating": true,
    "bus_with_live_tracking": false,
    "cabs": false,
    "hot_deals": false,
    "on_time": false,
    "bus_type": [],
    "time_range": [],
    "record_type": "data",
    "currencyId": "1",
  }
  crypto = inject(CryptoService)



  constructor(public router:Router) {
    this.storage = window.localStorage;
    const initialRef = this.getStoredReference(); // ✅ safe now
    this.referenceNumber = new BehaviorSubject<string | null>(initialRef);
    this.referenceNumber$ = this.referenceNumber.asObservable();

    const savedTab = localStorage.getItem(this.selectedTabKey) || 'onward';

    // Initialize BehaviorSubject **inside the constructor**
    this.selectedTabSubject = new BehaviorSubject<string>(savedTab);
    this.selectedTab$ = this.selectedTabSubject.asObservable(); // Set observable
  }


  setSelectedTab(tab: string): void {
    this.selectedTabSubject.next(tab);
    // console.log(tab, typeof tab)
    // localStorage.setItem(this.selectedTabKey, tab as string);
    localStorage.setItem(this.selectedTabKey, JSON.stringify(tab));
  }


  private getStoredReference():any {
    return  this.getConfig('booking_reference')
  }
  private setReference(value:any):any {
    this.setConfig('booking_reference',value);
    this.referenceNumber.next(value);
  }

  setConfig(key: string, value: any): void {
    try {
      // const encryptedValue = this.crypto.encrypt(value);
      // const serializedValue = JSON.stringify(encryptedValue);
      const serializedValue = JSON.stringify(value);
      // this.storage.setItem(key, serializedValue);
      this.storage.setItem(key, serializedValue);

    } catch (error) {
      console.error('Error saving to storage', error);
    }
  }


  getConfig<T>(key: string): T | null {
    try {
      const serializedValue = this.storage.getItem(key);
      // if (serializedValue){
      //   const parsedValue = JSON.parse(serializedValue);
      //   const decryptedValue = this.crypto.decrypt(parsedValue);
      //   return decryptedValue ? decryptedValue as T : null
      // }
      return serializedValue ? (JSON.parse(serializedValue) as T) : null;
    } catch (error) {
      console.error('Error reading from storage', error);
      return null;
    }
  }


  removeConfig(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage', error);
    }
  }

  clearConfigs(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }

  updateTripDetail(key: 'source_id' | 'destination_id' | 'travel_date' | 'source_name' | 'destination_name', value: any): void {

    const tripDetails = this.getTripDetails() || {};
    tripDetails[key] = value;

    try {
      const serializedDetails = JSON.stringify(tripDetails);
      this.storage.setItem(this.storageKey, serializedDetails);
    } catch (error) {
      console.error('Error updating trip details in storage', error);
    }
  }

  updateSearchPayload(key: 'destination_id' | 'travel_date', value: any): void {
    const tripDetails = this.payload || {};
    // console.log('ddddd',this.storage.getItem('payload'))
    tripDetails[key] = value;
    try {
      const serializedDetails = JSON.stringify(tripDetails);
      this.storage.setItem(this.payload, serializedDetails);
    } catch (error) {
      console.error('Error updating trip details in storage', error);
    }

  }

  /**
   * Retrieves the trip details from storage.
   * @returns The trip details object or null if not found.
   */
  getTripDetails(): { source_id?: string; destination_id?: string; date?: string } | any| null {
    // try {
    //   const serializedDetails = this.storage.getItem(this.storageKey);
    //   return serializedDetails? JSON.parse(serializedDetails) : null;
    // } catch (error) {
    //   console.error('Error retrieving trip details from storage', error);
    //   return null;
    // }
    return  {

    }
  }
  async getPayload(){
    console.log("GETTING PAYLOAD")
    this.payload.source_city_id=await this.getConfig('source_id');
    this.payload.destination_city_id=await this.getConfig('destination_id');
    this.payload.travel_date=await this.getConfig('travel_date');
    localStorage.setItem('[GET PAYLOAD]',JSON.stringify(this.payload))
    console.log("travel date", this.payload.travel_date)
    console.log("[GET TRAVEL DATE]", await this.getConfig('travel_date'))
    return this.payload
  }


  async getReturnPayload(){
    this.payload.source_city_id = await this.getConfig('destination_id');
    this.payload.destination_city_id= await this.getConfig('source_id');
    this.payload.travel_date=await this.getConfig('return_date');
    return this.payload
  }

  async saveOutward() {
    let trip:any= await this.getConfig('trip')
    let pickup:any =await this.getConfig('pickup')
    let seats:any = await this.getConfig('seats');
    seats = JSON.parse(seats);
    const seatIds:any[] = seats.map((seat:any) => seat.seat_id);
    let priceList:any=  await this.getConfig('priceList')
    let passengers:any=[]
    seats.forEach((element:any) => {
      let amount= 0;
      let currency ='kes'
      switch (element.seat_type) {
        case 'normal':
          amount = parseFloat(priceList.normal[0].price);
          currency = priceList.normal[0].currencyType
          break;
        case 'vip':
          amount = parseFloat(priceList.vip[0].price);
          currency = priceList.normal[0].currencyType
          break;
        case 'bclass':
          amount = parseFloat(priceList.bclass[0].price);
          currency = priceList.normal[0].currencyType
          break;
      }
      passengers.push({ "seat_id":element.seat_id,
        "seat_name": element.seat_name,
        "seat_type":element.seat_type,
        "ticketPrice":amount,
        "flatTicketPrice":amount,
        "currency": currency,
        "flat_sale": 0,})
    });
    const total = seats.reduce((sum:any, seat:any) => {
      let price = 0;
      switch (seat.seat_type) {
        case 'normal':
          price = parseFloat(priceList.normal[0].price);
          break;
        case 'vip':
          price = parseFloat(priceList.vip[0].price);
          break;
        case 'bclass':
          price = parseFloat(priceList.bclass[0].price);
          break;
      }
      return sum + price;
    }, 0);

    let booking = {
      "booking_date": await this.getConfig('travel_date'),
      "route_id": trip.route_id,
      "token":trip.token,
      "pickup_id": await this.getConfig('source_id'),
      "return_id":await this.getConfig('destination_id'),
      "source_city":await this.getConfig('source_name'),
      "dest_city": await this.getConfig('destination_name'),
      "bus_title":trip.trip_code,
      "company_logo": trip.company_logo,
      "company_name":trip.company_name,
      "currency": "KES",
      "departure_time":trip.departure_time,
      "boardingPointId":pickup.boarding.id,
      "droppingPointId":  pickup.dropping.id,
      "boardingPointname": pickup.boarding.name,
      "droppingPointname": pickup.dropping.name,
      "bus_id":trip.bus_id,
      "currencyId": "1",
      "ticket_cnt": seats.length,
      "bs_number_of_seats": trip.available_seat_count,
      "available_Seats": "f",
      "sub_total": total,
      "tax": "0.00",
      "total": total,
      "is_luggage": false,
      "c_address": "",
      "c_city": "",
      "c_state": "",
      "c_zip": "",
      "c_country": "",
      "is_flat_offer": false,
      "passenger":passengers,
      "isPromotional": false,
      "promotionalTripMsg": "",
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedDate": trip.delayedDate,
      "c_email": "davismutinda4@gmail.com",
      "selectedSeat": seatIds
    }
    let data:any={
      "ticketDetail": {
        "onwardticket": booking,
        "returnticket": {},
        "bookedThrough": "web"
      },
      "sourcetype": "web"
    }
    this.setConfig('booking',data);
  };


  async saveReturn() {
    let trip:any= await this.getConfig('trip')
    let pickup:any =await this.getConfig('pickup')
    let seats:any =await this.getConfig('seats');
    seats = JSON.parse(seats);
    const seatIds:any[] = seats.map((seat:any) => seat.seat_id);
    let priceList:any=  await this.getConfig('priceList')
    let passengers:any=[]
    seats.forEach((element:any) => {
      let amount= 0;
      let currency ='kes'
      switch (element.seat_type) {
        case 'normal':
          amount = parseFloat(priceList.normal[0].price);
          currency = priceList.normal[0].currencyType
          break;
        case 'vip':
          amount = parseFloat(priceList.vip[0].price);
          currency = priceList.normal[0].currencyType
          break;
        case 'bclass':
          amount = parseFloat(priceList.bclass[0].price);
          currency = priceList.normal[0].currencyType
          break;
      }
      passengers.push({ "seat_id":element.seat_id,
        "seat_name": element.seat_name,
        "seat_type":element.seat_type,
        "ticketPrice":amount,
        "flatTicketPrice":amount,
        "currency": currency,
        "flat_sale": 0,})
    });
    const total = seats.reduce((sum:any, seat:any) => {
      let price = 0;
      switch (seat.seat_type) {
        case 'normal':
          price = parseFloat(priceList.normal[0].price);
          break;
        case 'vip':
          price = parseFloat(priceList.vip[0].price);
          break;
        case 'bclass':
          price = parseFloat(priceList.bclass[0].price);
          break;
      }
      return sum + price;
    }, 0);

    let booking = {
      "booking_date": await this.getConfig('return_date'),
      "route_id": trip.route_id,
      "token":trip.token,
      "pickup_id":  await this.getConfig('destination_id'),
      "return_id":await this.getConfig('source_id'),
      "source_city":await this.getConfig('destination_name'),
      "dest_city": await this.getConfig('source_name')  ,
      "bus_title":trip.trip_code,
      "company_logo": trip.company_logo,
      "company_name":trip.company_name,
      "currency": "KES",
      "departure_time":trip.departure_time,
      "boardingPointId":pickup.boarding.id,
      "droppingPointId":  pickup.dropping.id,
      "boardingPointname": pickup.boarding.name,
      "droppingPointname": pickup.dropping.name,
      "bus_id":trip.bus_id,
      "currencyId": "1",
      "ticket_cnt": seats.length,
      "bs_number_of_seats": trip.available_seat_count,
      "available_Seats": "f",
      "sub_total": total,
      "tax": "0.00",
      "total": total,
      "is_luggage": false,
      "c_address": "",
      "c_city": "",
      "c_state": "",
      "c_zip": "",
      "c_country": "",
      "is_flat_offer": false,
      "passenger":passengers,
      "isPromotional": false,
      "promotionalTripMsg": "",
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedDate": trip.delayedDate,
      "c_email": "davismutinda4@gmail.com",
      "selectedSeat": seatIds
    }
    let data:any= await this.getConfig('booking');
    data.ticketDetail.returnticket=booking
    this.setConfig('booking',data);

  }


//   insurance

  insuranceSeats: string[] = [];

  setInsuranceSeats(seats: string[]) {
    this.insuranceSeats = seats;
    localStorage.setItem('insuredSeats', JSON.stringify(seats));
  }

  getInsuranceSeats(): string[] {
    return this.insuranceSeats.length
      ? this.insuranceSeats
      : JSON.parse(localStorage.getItem('insuredSeats') || '[]');
  }



}

