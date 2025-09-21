import { Component } from '@angular/core';
import { BusInfoComponent } from '../checkout/sections/bus-info/bus-info.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [
    BusInfoComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './trip-feedback-form.html',
  styleUrl: './trip-feedback-form.scss'
})
export class TripFeedbackForm {
  payDetailsVisible = false;

  // Rating categories
  overallRating = 0;
  busQualityRating = 0;
  punctualityRating = 0;
  staffBehaviourRating = 0;

  feedbackMessage = '';

  togglePayDetails() {
    this.payDetailsVisible = !this.payDetailsVisible;
  }

  onRatingChange(category: string, rating: number) {
    switch(category) {
      case 'overall':
        this.overallRating = rating;
        break;
      case 'busQuality':
        this.busQualityRating = rating;
        break;
      case 'punctuality':
        this.punctualityRating = rating;
        break;
      case 'staffBehaviour':
        this.staffBehaviourRating = rating;
        break;
    }
    console.log(`${category} rating selected:`, rating);
  }

  onFeedbackChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.feedbackMessage = target.value;
    console.log('Feedback message:', this.feedbackMessage);
  }

  onSubmitFeedback() {
    console.log('=== FEEDBACK SUBMISSION ===');
    console.log('Overall Rating:', this.overallRating);
    console.log('Bus Quality Rating:', this.busQualityRating);
    console.log('Punctuality Rating:', this.punctualityRating);
    console.log('Staff Behaviour Rating:', this.staffBehaviourRating);
    console.log('Message:', this.feedbackMessage);
    console.log('========================');

    // Create feedback object
    const feedback = {
      ratings: {
        overall: this.overallRating,
        busQuality: this.busQualityRating,
        punctuality: this.punctualityRating,
        staffBehaviour: this.staffBehaviourRating
      },
      message: this.feedbackMessage,
      timestamp: new Date()
    };

    console.log('Feedback object:', feedback);

    // Here you would typically send this data to your backend service
    // this.feedbackService.submitFeedback(feedback);
  }

  // Helper method to generate star rating array
  getStarArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i + 1);
  }
}
