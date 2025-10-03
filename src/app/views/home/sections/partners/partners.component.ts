import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

interface Partner {
  name: string;
  logo: string;
  description?: string;
}

interface PartnerBenefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-partners',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  // @ViewChild('logoCarousel') logoCarousel!: NgbCarousel;

  partners: Partner[] = [
    {
      name: 'Dream',
      logo: 'https://iabiri.com/assets/logo/dreamline.png',
      description: 'Premier bus service with routes throughout Kenya'
    },
    {
      name: 'Mash East Africa',
      logo: 'https://iabiri.com/assets/logo/mash.png',
      description: 'Luxury bus service with international routes'
    },
    {
      name: 'Modern Coast',
      logo: 'https://iabiri.com/assets/logo/modern-coast.png',
      description: 'Express services to major cities and tourist destinations'
    },
    {
      name: 'Buscar',
      logo: 'https://iabiri.com/assets/logo/buscar.png',
      description: 'Reliable transportation to multiple destinations'
    },
    {
      name: 'Simba Coach',
      logo: 'https://iabiri.com/assets/logo/simbacoach.png',
      description: 'Fast and efficient intercity services'
    },
    {
      name: 'Daya City',
      logo: 'https://iabiri.com/assets/logo/dayahcity.png',
      description: 'Comfortable travel across East Africa'
    },
    // {
    //   name: 'Gateway Coach',
    //   logo: 'https://iabiri.com/assets/logo/gateway.jpg',
    //   description: 'Coast region specialist with premium services'
    // },
    // {
    //   name: 'Palmers',
    //   logo: 'https://iabiri.com/assets/logo/palmers.png',
    //   description: 'Experienced operator with decades of service'
    // }
  ];

  // Group partners into slides of 4
  partnerSlides = this.chunkArray(this.partners, 6);

  partnerBenefits: PartnerBenefit[] = [
    {
      icon: 'bi bi-graph-up-arrow',
      title: 'Increased Revenue',
      description: 'Access to our wide customer base means more bookings and higher revenue for your business.'
    },
    {
      icon: 'bi bi-laptop',
      title: 'Easy Management',
      description: 'Our state-of-the-art booking platform makes managing schedules and bookings simple.'
    },
    {
      icon: 'bi bi-megaphone',
      title: 'Brand Visibility',
      description: 'Get your transport service in front of thousands of potential customers daily.'
    },
    {
      icon: 'bi bi-people',
      title: 'Customer Support',
      description: 'Our dedicated team handles customer inquiries, allowing you to focus on your core operations.'
    }
  ];

  // Helper function to chunk array into groups
  private chunkArray(array: any[], size: number) {
    const chunked = [];
    let index = 0;
    while (index < array.length) {
      chunked.push(array.slice(index, index + size));
      index += size;
    }
    return chunked;
  }


}
