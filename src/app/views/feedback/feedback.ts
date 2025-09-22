import {Component, inject, OnInit} from '@angular/core';
import {BusInfoComponent} from '../checkout/sections/bus-info/bus-info.component';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {PaymentSocketService} from '../../services/payment-socket-service';
import {askConfirmation} from '@angular/cli/src/utilities/prompt';

@Component({
  selector: 'app-feedback',
  imports: [
    BusInfoComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss'
})
export class Feedback  implements  OnInit{
  payDetailsVisible = false;
  selectedRating = 0;
  feedbackMessage = '';
  paymentSocketService = inject(PaymentSocketService);

  ngOnInit() {
    this.paymentSocketService.paymentConfirmation$.subscribe(confirmation =>{
      if(confirmation){

        console.log('Payment confirmation success');
      }
})
  }

  togglePayDetails() {
    this.payDetailsVisible = !this.payDetailsVisible;
  }

  onRatingChange(rating: number) {
    this.selectedRating = rating;
    console.log('Rating selected:', rating);
  }

  onFeedbackChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.feedbackMessage = target.value;
    console.log('Feedback message:', this.feedbackMessage);
  }

  onSubmitFeedback() {
    console.log('=== FEEDBACK SUBMISSION ===');
    console.log('Rating:', this.selectedRating);
    console.log('Message:', this.feedbackMessage);
    console.log('========================');

    // You can also create an object for easier handling
    const feedback = {
      rating: this.selectedRating,
      message: this.feedbackMessage,
      timestamp: new Date()
    };

    console.log('Feedback object:', feedback);

    // Here you would typically send this data to your backend service
    // this.feedbackService.submitFeedback(feedback);
  }
}
