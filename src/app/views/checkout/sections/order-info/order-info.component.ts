import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingService} from '../../../../services/booking';

@Component({
  selector: 'app-checkout-order-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-info.component.html',
  styleUrl: './order-info.component.scss'
})
export class OrderInfoComponent{
  data:any={};
  constructor(public bookingService:BookingService){
    this.getBooking();
  }
 async getBooking(){
  this.data = await this.bookingService.getConfig('booking');
  console.log('sssss',this.data)
 }
}
