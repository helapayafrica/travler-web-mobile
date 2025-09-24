import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  partnerName: string;
}

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    {
      name: 'John Mwangi',
      avatar:
        'https://images.unsplash.com/photo-1689857538296-b6e1a392a91d?w=500&auto=format&fit=crop&q=60',
      rating: 5,
      text: `I've been using Travler through this booking platform for my monthly trips to Kisumu. The service is always reliable...`,
      partnerName: 'Travler',
    },
    {
      name: 'Sarah Ochieng',
      avatar:
        'https://images.unsplash.com/photo-1622556498246-755f44ca76f3?w=500&auto=format&fit=crop&q=60',
      rating: 4,
      text: 'Travler has comfortable buses and their staff is very professional. Booking through this app has saved me from long queues.',
      partnerName: 'Travler',
    },
    {
      name: 'David Kimani',
      avatar:
        'https://images.unsplash.com/photo-1652006135065-1a5790b66f86?w=500&auto=format&fit=crop&q=60',
      rating: 5,
      text: 'Mash East Africa provides excellent service on their long-distance routes. The buses are clean and the drivers are careful.',
      partnerName: 'Mash East Africa',
    },
  ];

  visibleTestimonials: Testimonial[] = [];
  currentIndex = 0;
  autoScrollInterval: any;

  ngOnInit() {
    this.cloneForLoop();
    this.startAutoScroll();
  }

  cloneForLoop() {
    // Duplicate first few for smooth infinite loop
    this.visibleTestimonials = [...this.testimonials, ...this.testimonials, ...this.testimonials];
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.next();
    }, 7000);
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.testimonials.length) {
      this.currentIndex = 0;
    }
  }

  prev() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.testimonials.length - 1;
    }
  }

  onSwipe(event: any) {
    if (event.deltaX < 0) {
      this.next();
    } else {
      this.prev();
    }
  }


}
