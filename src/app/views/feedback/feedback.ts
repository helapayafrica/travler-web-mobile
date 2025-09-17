import { Component } from '@angular/core';
import {BusInfoComponent} from '../checkout/sections/bus-info/bus-info.component';

@Component({
  selector: 'app-feedback',
  imports: [
    BusInfoComponent
  ],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss'
})
export class Feedback {
  payDetailsVisible: boolean = false;

  togglePayDetails() {
    this.payDetailsVisible = !this.payDetailsVisible;
  }
}
