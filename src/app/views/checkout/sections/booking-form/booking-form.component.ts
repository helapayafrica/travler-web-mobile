import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {Router} from '@angular/router';
import {CouponInsuredService} from '../../../../services/coupon-insured.service';
import {BookingService} from '../../../../services/booking';
import {BackendService} from '../../../../services/backend';

@Component({
  selector: 'app-checkout-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TypeaheadModule,],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent implements OnInit {
  email = "info@iabiri.com"
  isSuccess = false;
  nationalities: any = [];
  country_codes = [
    {code: '254', country: 'Kenya'},
    {code: '255', country: 'Tanzania'},
    {code: '256', country: 'Uganda'},
    {code: '250', country: 'Rwanda'}
  ];
  insuredSeats = []
  protectionInsuranceService = inject(CouponInsuredService)
  data: any = {};
  total: any = 0;
  cancellationEnabled: any;

  ngOnInit() {
    this.cancellationEnabled = this.protectionInsuranceService.isCancellationProtection();
  }

  constructor(public bookingService: BookingService, public service: BackendService, public router: Router, private cdr: ChangeDetectorRef) {
    this.getBooking();
    this.getNationality();
    this.insuredSeats = JSON.parse(localStorage.getItem('insuredSeats') || '[]');
  }

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  getNationality() {
    this.service.getNationality().subscribe((res) => {
      this.nationalities = res.suggestions
    })
  }

  proceed() {
    this.data.ticketDetail.onwardticket.passenger.forEach((element: any, i: any) => {
      this.data.ticketDetail.onwardticket.c_email = element.email;
      if (Object.keys(this.data.ticketDetail.returnticket).length > 0) {
        this.data.ticketDetail.returnticket.c_email = element.email;
        this.data.ticketDetail.returnticket.currencyId = "1";
        this.data.ticketDetail.returnticket.passenger[i].name = element.name
        this.data.ticketDetail.returnticket.passenger[i].age = element.age
        this.data.ticketDetail.returnticket.passenger[i].gender = element.gender
        this.data.ticketDetail.returnticket.passenger[i].id_no = element.id_no
        this.data.ticketDetail.returnticket.passenger[i].mobileId = element.mobileId
        this.data.ticketDetail.returnticket.passenger[i].nationality = element.nationality
        this.data.ticketDetail.returnticket.passenger[i].mobile = element.mobile
      }
    });
    console.log('[this booking data],', this.data)
    this.service.bookingTicket(this.data).subscribe((res) => {
      this.isSuccess = true
      this.bookingService.setConfig('booking_reference', res.booking_reference);
      this.bookingService.setConfig('ticket', this.data);
      this.router.navigateByUrl('/payment');
    })
  }

  onCancellationChange($event: Event) {
    const checked = ($event.target as HTMLInputElement).checked;
    this.cancellationEnabled = checked;
    this.protectionInsuranceService.updateCancellationProtection(checked);
  }

  // Called from template
  saveInsuranceSelection(seat_name: string, selected: boolean) {
    this.protectionInsuranceService.updateInsuredSeats(seat_name, selected);
    this.cdr.markForCheck();
  }

  async getBooking() {
    this.data = await this.bookingService.getConfig('booking');
    this.total = this.data.ticketDetail.onwardticket?.total || this.data.ticketDetail.returnticket?.total;
    this.bookingService.setConfig('total', this.total);
  }

  updateCancellationProtection($event: any) {
    let checked = $event.target?.checked as boolean
    this.protectionInsuranceService.updateCancellationProtection(checked)
  }
}
