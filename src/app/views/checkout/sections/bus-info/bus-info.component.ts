import {CommonModule} from '@angular/common';
import {AfterViewInit, ChangeDetectorRef, Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import {BookingFormComponent} from '../booking-form/booking-form.component';
import {BookingService} from '../../../../services/booking';
import {CouponInsuredService} from '../../../../services/coupon-insured.service';


@Component({
  selector: 'app-checkout-bus-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-info.component.html',
  styleUrl: './bus-info.component.scss'
})
export class BusInfoComponent {
  data: any = {};
  platformFee = 150;
  discount = 100;
  onwardSeatsSummary: any[] = [];
  returnSeatsSummary: any[] = [];

  cancellationInsuredService = inject(CouponInsuredService);

  constructor(public bookingService: BookingService, private cdr: ChangeDetectorRef) {
    this.getBooking();
    this.cancellationInsuredService.loadCancellationProtection();

    // Effect to react to any changes in the service
    effect(() => {
      const total = this.cancellationInsuredService.total();
      const insuranceCost = this.cancellationInsuredService.insuranceCost();
      const cancellationCost = this.cancellationInsuredService.cancellationCost();

      console.log('Service values changed:', {
        total,
        insuranceCost,
        cancellationCost,
        isProtected: this.cancellationInsuredService.isCancellationProtection()
      });

      this.cdr.markForCheck();
    });
  }

  async getBooking() {
    this.data = await this.bookingService.getConfig('booking');

    // Initialize the service with booking data
    this.cancellationInsuredService.initializeBooking(this.data);

    // Process seats data
    this.seatSelected();
  }

  // Use service computed values instead of manual calculations
  get total() {
    return this.cancellationInsuredService.total() + this.platformFee - this.discount;
  }

  get baseFare() {
    return this.cancellationInsuredService.baseTotal();
  }

  get totalInsurance() {
    return this.cancellationInsuredService.insuranceCost();
  }

  get cancellationProtectionCost() {
    return this.cancellationInsuredService.cancellationCost();
  }

  get isProtected() {
    return this.cancellationInsuredService.isCancellationProtection();
  }

  get passengerCount() {
    return this.cancellationInsuredService.passengerCount();
  }

  get protectedPassengersCount() {
    return this.cancellationInsuredService.protectedPassengersCount();
  }

  get protectionPercentage() {
    return this.cancellationInsuredService.protectionPercentage();
  }

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  getSelectedSeatsString(): string {
    let onwardSeats: string[] = [];
    let returnSeats: string[] = [];

    if (this.data?.ticketDetail?.onwardticket?.passenger?.length) {
      onwardSeats = this.data.ticketDetail.onwardticket.passenger
        .map((seat: { seat_name: string }) => seat.seat_name);
    }

    if (this.data?.ticketDetail?.returnticket?.passenger?.length) {
      returnSeats = this.data.ticketDetail.returnticket.passenger
        .map((seat: { seat_name: string }) => seat.seat_name);
    }

    const allSeats = [...onwardSeats, ...returnSeats].sort((a, b) =>
      a.localeCompare(b, undefined, {numeric: true})
    );

    return allSeats.length ? allSeats.join(', ') : 'No seats selected';
  }

  getTotalPassengers(): number {
    const onwardPassengersCount = this.data?.ticketDetail?.onwardticket?.passenger?.length || 0;
    const returnPassengersCount = this.data?.ticketDetail?.returnticket?.passenger?.length || 0;
    return onwardPassengersCount + returnPassengersCount;
  }

  // Remove the old addAdditionalFees method since service handles this now

  getSelectedSeats() {
    this.seatSelected();
    const onwardSeats = this.data?.ticketDetail?.onwardticket?.passenger || [];
    const returnSeats = this.data?.ticketDetail?.returnticket?.passenger || [];
    let onwardSeatNames = '';
    let returnSeatNames = '';

    console.log('[Onward Seats]', onwardSeats);

    if (onwardSeats.length > 0) {
      onwardSeats.forEach((p: any) => {
        console.log('[onwardSeats]', p.seat_name);
        onwardSeatNames += p.seat_name + ', ';
      });
      console.log('[onwardSeatNames]', onwardSeatNames);
    }

    if (returnSeats.length > 0) {
      returnSeats.forEach((p: any) => {
        console.log('[returnSeats]', p);
        returnSeatNames += p.seat_name + ', ';
      });
      console.log('[returnSeatNames]', returnSeatNames);
    }

    return onwardSeatNames;
  }

  seatSelected() {
    console.log('[this data from Booking]', this.data);
    const onwardSeats = this.data?.ticketDetail?.onwardticket?.passenger || [];
    const returnSeats = this.data?.ticketDetail?.returnticket?.passenger || [];
    this.onwardSeatsSummary = this.getSeatTypeSummaryDetailed(onwardSeats);
    console.log('[this onwardSeatsSummary]', this.onwardSeatsSummary);
    this.returnSeatsSummary = this.getSeatTypeSummaryDetailed(returnSeats);
  }

  getSeatTypeSummaryDetailed(seats: any[]): any[] {
    if (!seats || seats.length === 0) {
      return [];
    }

    const seatGroups = seats.reduce((groups: any, seat: any) => {
      const seatType = seat.seat_type;

      if (!groups[seatType]) {
        groups[seatType] = {
          seat_type: seatType,
          total_number: 0,
          total_price: 0,
          total_flat_price: 0,
          currency: seat.currency || 'KES',
          seat_names: [],
          seat_ids: [],
          average_price: 0
        };
      }

      groups[seatType].total_number += 1;
      groups[seatType].total_price += seat.ticketPrice || 0;
      groups[seatType].total_flat_price += seat.flatTicketPrice || 0;
      groups[seatType].seat_names.push(seat.seat_name);
      groups[seatType].seat_ids.push(seat.seat_id);

      return groups;
    }, {});

    // Calculate average price for each group
    const result = Object.values(seatGroups).map((group: any) => {
      group.average_price = group.total_number > 0 ?
        Math.round((group.total_price / group.total_number) * 100) / 100 : 0;
      return group;
    });

    return result;
  }

  // Additional helper methods using service data
  getInsuredSeatsString(): string {
    const insuredSeats = this.cancellationInsuredService.insuredSeats();
    return insuredSeats.map(seat => seat.seat_name).join(', ');
  }

  getUninsuredSeatsString(): string {
    const allSeats = this.getSelectedSeatsString().split(', ').filter(seat => seat.trim());
    const insuredSeats = this.cancellationInsuredService.insuredSeats().map(seat => seat.seat_name);
    const uninsuredSeats = allSeats.filter(seat => !insuredSeats.includes(seat));
    return uninsuredSeats.join(', ');
  }

  // Get insured passenger names (not seats)
  getInsuredPassengerNames(): string {
    const insuredPassengers = this.cancellationInsuredService.getInsuredPassengerDetails();
    return insuredPassengers.map(p => p.name || `Passenger ${p.index + 1}`).join(', ');
  }

  // Get uninsured passenger names
  getUninsuredPassengerNames(): string {
    const passengers = this.cancellationInsuredService.passengerData();
    const insuredPassengers = this.cancellationInsuredService.getInsuredPassengerDetails();
    const insuredIds = insuredPassengers.map(p => p.id);

    const uninsuredPassengers = passengers.filter(p => !insuredIds.includes(p.id));
    return uninsuredPassengers.map(p => p.name || `Passenger ${p.index + 1}`).join(', ');
  }

  // Cost breakdown methods for template
  getTotalWithoutExtras(): number {
    return this.cancellationInsuredService.total();
  }

  getFinalTotal(): number {
    return this.getTotalWithoutExtras() + this.platformFee - this.discount;
  }

  getCostBreakdown() {
    return {
      baseFare: this.baseFare,
      insurance: this.totalInsurance,
      cancellation: this.cancellationProtectionCost,
      platform: this.platformFee,
      discount: this.discount,
      subtotal: this.getTotalWithoutExtras(),
      total: this.getFinalTotal()
    };
  }
}
