import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'displayAmenity'
})
export class AmenitiesPipe implements PipeTransform {

  constructor(private readonly sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeHtml {
    let svg: string;

    switch (value.toLowerCase()) {
      // WiFi - Clear wireless internet symbol
      case '1':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>`;
        break;

      // Entertainment/TV - Television screen for onboard entertainment
      case '2':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v1h8v-1l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H3V5h18v10z"/>
          <polygon points="10,8.5 10,15.5 16,12"/>
        </svg>`;
        break;

      // Air Conditioning - Snowflake for cool air/AC
      case '3':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15.83 10H13V7.17l3.24-3.24-1.42-1.41L12 5.83V2h-2v3.83L7.17 2.59 5.76 4.01 9 7.17V10H6.17L2.93 6.76 1.51 8.17 4.75 11H1v2h3.75l-3.24 3.24 1.42 1.42L6.17 14H9v2.83l-3.24 3.24 1.41 1.42L10 18.17V22h2v-3.83l2.83 2.83 1.42-1.42L13 16.83V14h2.83l3.24 3.24 1.42-1.42L17.25 13H22v-2z"/>
        </svg>`;
        break;

      // USB Charging - USB plug symbol for device charging
      case '4':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2h1V7H4v10h16V7h-5z"/>
          <rect x="9" y="12" width="6" height="2"/>
          <rect x="10" y="14" width="4" height="1"/>
        </svg>`;
        break;

      // Toilet/Restroom - Clear restroom symbol
      case '5':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.5 22v-7.5H4V9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v5.5H9.5V22h-4zM18 22v-6h1.33L17.5 9.5c-.19-.83-.94-1.5-1.81-1.5s-1.63.67-1.81 1.5L12.67 16H14v6h4z"/>
          <circle cx="7.5" cy="4.5" r="2"/>
          <circle cx="15.5" cy="4.5" r="2"/>
        </svg>`;
        break;

      // Water/Refreshments - Water bottle for drinks/refreshments
      case '6':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 2v1h2V2c0-.55-.45-1-1-1s-1 .45-1 1zm4 0v1h2V2c0-.55-.45-1-1-1s-1 .45-1 1zM6 5v2h12V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1zm1 4v10c0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3V9H7zm8 8H9v-1h6v1zm0-2H9v-1h6v1zm0-2H9v-1h6v1z"/>
        </svg>`;
        break;

      // Reading Light - Lamp/light bulb for individual reading lights
      case '7':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
        </svg>`;
        break;

      // Blanket/Pillow - Comfort items
      case '8':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 9V7l-3 2 3 2zm-4 4v4H3v-4h14zm2-6.5L17 8l2 1.5L17 11l2 1.5L17 14l2-1.5zM19 3H5C3.9 3 3 3.9 3 5v4h16V5c0-1.1-.9-2-2-2zm0 4H5V5h14v2z"/>
        </svg>`;
        break;

      // Snacks/Food service
      case '9':
        svg = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
        </svg>`;
        break;

      default:
        svg = '';
    }

    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
