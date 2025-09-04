import { Component } from '@angular/core';
import {BookingFormComponent} from './sections/booking-form/booking-form.component';
import {PaymentFormComponent} from './sections/payment-form/payment-form.component';
import {BusInfoComponent} from './sections/bus-info/bus-info.component';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-view-checkout',
  standalone: true,
  imports: [
    BookingFormComponent,
    BusInfoComponent,
    Drawer,
    Button
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  busInfoVisible = false
}
