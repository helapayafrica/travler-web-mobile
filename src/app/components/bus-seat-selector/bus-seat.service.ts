import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookingService} from '../../services/booking';

export interface SeatData {
  left: string;
  top: string;
  seat_id: string;
  seat_width: string;
  seat_height: string;
  seat_name: string;
  seat_type: string;
  seat_type_id: string;
  seat_color: string;
  selection_status: boolean;
}

export interface PriceData {
  normal: { price: string }[];
  vip: { price: string }[];
  bclass: { price: string }[];
}

export interface BusData {
  priceList: PriceData;
  data: SeatData[];
  seatsBooked: number;
  isSuccess: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BusSeatService {

  private selectedSeatsSubject = new BehaviorSubject<SeatData[]>([]);
  selectedSeats$ = this.selectedSeatsSubject.asObservable();
  constructor(private http: HttpClient,public bookingService:BookingService) {}


  toggleSeat(seat: SeatData, currentSelection: SeatData[]): SeatData[] {
    if (seat.selection_status) {
      return currentSelection;
    }

    const index = currentSelection.findIndex(s => s.seat_id === seat.seat_id);
    if (index === -1) {
      if(this.isMaxSeatsSelected()){
        return [...currentSelection, seat];
      } else{
          return [...currentSelection];
      }

    } else {
      return currentSelection.filter(s => s.seat_id !== seat.seat_id);
    }
  }

  isMaxSeatsSelected(): boolean {
    const selectedSeatsLength = this.selectedSeatsSubject.getValue().length;
    return selectedSeatsLength < 6; // Assuming max 4 seats per booking
  }

  calculatePrice(seats: SeatData[], priceList: PriceData): number {
    return seats.reduce((total, seat) => {
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
      return total + price;
    }, 0);
  }

  getSeatTypesSummary(seats: SeatData[]): string {
    const types = seats.reduce((acc, seat) => {
      acc[seat.seat_type] = (acc[seat.seat_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(types)
      .map(([type, count]) => `${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`)
      .join(' • ');
  }

  updateSelectedSeats(seats: SeatData[]): void {
    this.selectedSeatsSubject.next(seats);
    this.bookingService.setConfig('seats',JSON.stringify(seats));
  }
}
