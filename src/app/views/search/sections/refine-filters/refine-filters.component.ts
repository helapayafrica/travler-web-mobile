import { Component } from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-search-refine-filters',
  standalone: true,
  imports: [NgxSliderModule, CurrencyPipe],
  templateUrl: './refine-filters.component.html',
  styleUrl: './refine-filters.component.scss'
})
export class RefineFiltersComponent {
  minValue: number = 1000;
  maxValue: number = 7000;
  options: any = {
    floor: 0,
    ceil: 10000,
    step: 100,
    translate: (value: number): string => {
      return `KES ${value}`;
    }
  };

}
