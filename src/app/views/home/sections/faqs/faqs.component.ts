import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
  animations: [
    trigger('fadeInOnScroll', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('600ms ease-out')),
    ])
  ]
})
export class FAQSComponent {

  generalTab = true;
  ticketsTab = false;
  paymentTab = false;

  openGeneralTab() {
    this.generalTab = true;
    this.ticketsTab = false;
    this.paymentTab = false;
  }
  openTicketsTab() {
    this.generalTab = false;
    this.ticketsTab = true;
    this.paymentTab = false;
  }
  openPaymentTab() {
    this.generalTab = false;
    this.ticketsTab = false;
    this.paymentTab = true;
  }

}
