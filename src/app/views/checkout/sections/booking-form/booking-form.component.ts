import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {Router} from '@angular/router';
import {CouponInsuredService} from '../../../../services/coupon-insured.service';
import {BookingService} from '../../../../services/booking';
import {BackendService} from '../../../../services/backend';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TypeaheadModule, Dialog, Button, TranslatePipe,],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent implements OnInit {
  email = "info@Travler.com"
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
  passengerInsuranceMap:{[index:number] : string} = {}

  async ngOnInit() {
    this.cancellationEnabled = this.protectionInsuranceService.isCancellationProtection();

  await this.getBooking()
    if(this.data)
    {
      this.protectionInsuranceService.initializeBooking(this.data);
    }
  }

  constructor(public bookingService: BookingService, public service: BackendService, public router: Router, private cdr: ChangeDetectorRef) {
    this.getBooking();
    this.getNationality();
    // this.insuredSeats = JSON.parse(localStorage.getItem('insuredSeats') || '[]');
    this.insuredSeats = this.bookingService.getConfig('insuredSeats') || [];
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
    // Add this line
    // this.data.insuranceDetails = this.getInsuranceBookingData();

    // console.log('[this booking data],', this.getInsuranceBookingData())
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
    // console.log('[this booking data],', this.data)
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


  //  DIALOGs

  travelInsurances = [
    {
      name: 'Jubilee Insurance',
      price: 50,
      description:
        'Comprehensive travel insurance with medical and baggage protections',
      benefits: [
        'Emergency medical treatment & evacuation',
        'Trip cancellation or interruption cover',
        'Loss or delay of baggage',
        '24/7 worldwide assistance hotline'
      ]
    },
    {
      name: 'APA Insurance',
      price: 60,
      description:
        'Medical emergencies, trip interruption cover, and baggage loss protection',
      benefits: [
        'Overseas hospital and doctor expenses',
        'Reimbursement for missed connections',
        'Coverage for lost passports or travel documents',
        'Personal accident and liability cover'
      ]
    },
    {
      name: 'Britam Travel Cover',
      price: 55,
      description:
        'Worldwide medical cover, evacuation, and personal liability benefits',
      benefits: [
        'Emergency medical & dental care',
        'Trip delay and missed departure compensation',
        'Baggage loss/damage insurance',
        'Personal liability up to policy limits'
      ]
    }
  ];

  dialog = false;
  selectedInsurance: any;

  showDialog(insurance: any) {
    this.selectedInsurance = insurance;
    this.dialog = true;
  }

  selectedInsuranceName: string = '';

  // onSelect(insName: string, passengerIndex: number) {
  //   console.log(insName, passengerIndex)
  //   if (insName !== 'none') {
  //     this.passengerInsuranceMap[passengerIndex] = insName;
  //     this.applyInsuranceToPassenger(passengerIndex, true);
  //   } else {
  //     delete this.passengerInsuranceMap[passengerIndex];
  //     this.applyInsuranceToPassenger(passengerIndex, false);
  //   }
  // }
  onSelect(insName: string, passengerIndex: number) {
    const currentSelection = this.getSelectedInsurance(passengerIndex);

    // If clicking the same option, unselect it (set to 'none')
    if (currentSelection === insName && insName !== 'none') {
      delete this.passengerInsuranceMap[passengerIndex];
      this.applyInsuranceToPassenger(passengerIndex, false);
    } else {
      // Select new option
      if (insName !== 'none') {
        this.passengerInsuranceMap[passengerIndex] = insName;
        this.applyInsuranceToPassenger(passengerIndex, true);
      } else {
        delete this.passengerInsuranceMap[passengerIndex];
        this.applyInsuranceToPassenger(passengerIndex, false);
      }
    }

    this.cdr.markForCheck();
  }

  onSelectNone(passengerIndex: number) {
    delete this.passengerInsuranceMap[passengerIndex];
    this.applyInsuranceToPassenger(passengerIndex, false);
    this.cdr.markForCheck();
  }


  private applyInsuranceToPassenger(passengerIndex: number, insured: boolean) {
    const passenger = this.data?.ticketDetail?.onwardticket?.passenger?.[passengerIndex];

    if (passenger?.seat_name) {
      this.protectionInsuranceService.updateInsuredSeats(passenger.seat_name, insured);
    }

    const returnPassenger = this.data?.ticketDetail?.returnticket?.passenger?.[passengerIndex];
    if (returnPassenger?.seat_name) {
      this.protectionInsuranceService.updateInsuredSeats(returnPassenger.seat_name, insured);
    }
  }

  getInsuranceBookingData() {
    return {
      totalInsuranceCost: this.protectionInsuranceService.insuranceCost(),
      insuredPassengers: this.protectionInsuranceService.getInsuredPassengerDetails(),
      selections: this.passengerInsuranceMap
    };
  }


  getSelectedInsurance(passengerIndex: number): string {
    return this.passengerInsuranceMap[passengerIndex] || 'none';
  }

  validateField(fieldName: string, value: any, index: number): string {
    const field = fieldName.split('_')[0]; // name, age, gender, etc.

    switch(field) {
      case 'name':
        return !value || value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'age':
        return !value || value < 1 || value > 120 ? 'Enter valid age (1-120)' : '';
      case 'gender':
        return !value ? 'Gender is required' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Enter valid email' : '';
      case 'mobile':
        return !value || value.toString().length < 9 ? 'Enter valid phone number' : '';
      case 'id':
        return !value ? 'ID number is required' : '';
      case 'nationality':
        return !value ? 'Nationality is required' : '';
      default:
        return '';
    }
  }

// In your component class
formErrors: { [key: string]: string } = {};
touchedFields: Set<string> = new Set();

onFieldBlur(fieldName: string, value: any, index: number) {
  this.touchedFields.add(fieldName + index);
  const error = this.validateField(fieldName, value, index);
  if (error) {
    this.formErrors[fieldName + index] = error;
  } else {
    delete this.formErrors[fieldName + index];
  }
  this.cdr.markForCheck();
}

hasError(fieldName: string, index: number): boolean {
  return this.touchedFields.has(fieldName + index) && !!this.formErrors[fieldName + index];
}

hasFormErrors(): boolean {
  return Object.keys(this.formErrors).length > 0;
}
}
