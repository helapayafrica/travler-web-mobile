import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  ngOnInit(): void {
    //  Change the color scheme very five seconds
    setInterval(() => {

      this.currentIndex = (this.currentIndex + 1) % this.colorImages.length;
      this.colorImage = this.colorImages[this.currentIndex];
    }, 5000);
  }


  colorImages = [
    {
      bgColor: '#ffffff',
      stat: 30,
      text: 'Operators',
      color: '#000000',
      icon: 'bi bi-bus-front'
    },
    {
      bgColor: '#ED2112',
      stat: 4,
      text: 'Operational Countries',
      color: '#ffffff',
      icon: 'bi bi-globe'
    },
    {
      bgColor: '#000000',
      stat: '5M',
      text: 'Tickets Sold',
      color: '#ffffff',
      icon: 'bi bi-ticket-perforated'
    }
  ];


  colorImage  = this.colorImages [0]
  currentIndex = 0

}
