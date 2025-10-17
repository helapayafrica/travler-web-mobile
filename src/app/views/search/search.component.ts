import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {SearchComponent as SharedSearchComponent} from '../../shared/search/search.component';
import {ResultsComponent} from './sections/results/results.component';
import {BackendService} from '../../services/backend';
import {BookingService} from '../../services/booking';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {Drawer} from 'primeng/drawer';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {FormsModule} from '@angular/forms';
import {RefineFiltersComponent} from './sections/refine-filters/refine-filters.component';
import {TranslatePipe} from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-search',
  standalone: true,
  imports: [
    SharedSearchComponent,
    ResultsComponent,
    NgIf,
    Button,
    Drawer,
    TabPanel,
    NgForOf,
    NgxSliderModule,
    Tabs,
    TabList,
    Tab,
    CurrencyPipe,
    FormsModule,
    TabPanels,
    RefineFiltersComponent,
    TranslatePipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  buses: any[] = []; // Initialize as empty array
  payload = {};
  isLoading = false;
  hasSearched = false; // Track if initial search has been performed

  constructor(
    public backendService: BackendService,
    public bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private zone: NgZone,
  ) {}

  async ngOnInit(): Promise<void> {

    this.payload = await this.getPayload();


    // Ensure payload is properly structured before making API call
    if (this.payload && Object.keys(this.payload).length > 0) {
      this.hasSearched = true;
      this.fetchBuses(this.payload);
    } else {
      console.error('Payload is empty - no results will load');
      this.hasSearched = true;
      this.isLoading = false;
      // You might want to set a default payload or show an error message
    }

    const text = this.getTextForBreadCrumb();
    const routerLink = '/search';
    this.items = [{ text, routerLink }];
  }

  async getPayload() {

    return await this.bookingService.getPayload();
  }
  fetchBuses(payload: any) {
    this.isLoading = true;

    this.backendService.getTrips(payload).subscribe({
  next: (res) => {
    this.zone.run(() => {
      this.buses = [...(res?.data || [])];
      this.isLoading = false;
      this.hasSearched = true;
      this.cdr.detectChanges();
      setTimeout(() => this.cdr.detectChanges(), 0);
    });
  },
  error: (err) => {
    this.zone.run(() => {
      this.buses = [];
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  },
});

  }

  //BreadCrumb
  home = { label: 'Home' };
  items: any = [];
  isFormOpen = false;

  filterVisible = false;

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
  }

  // Filter settings for Drawer
  minValue = 0;
  maxValue = 10000;
  options: any = {
    floor: 0,
    ceil: 10000,
    step: 100,
    translate: (value: number): string => {
      return `KES ${value}`;
    },
  };

  durations = [
    { label: '3 hours', value: '3h', icon: 'bi bi-clock' },
    { label: '3-5 hours', value: '3-5h', icon: 'bi bi-hourglass-split' },
    { label: '5-7 hours', value: '5-7h', icon: 'bi bi-stopwatch' },
    { label: '7+ hours', value: '7+h', icon: 'bi bi-alarm' },
  ];
  selectedDuration = '3h';

  services = [
    { label: 'Wi-Fi', checked: false, icon: 'bi bi-wifi' },
    { label: 'TV', checked: false, icon: 'bi bi-tv' },
    { label: 'Bed', checked: false, icon: 'bi bi-moon' },
    { label: 'Meals', checked: false, icon: 'bi bi-egg-fried' },
  ];

  getTextForBreadCrumb() {
    const sourceName = this.bookingService.getConfig('source_name');
    const destinationName = this.bookingService.getConfig('destination_name');
    return `${sourceName} to ${destinationName}`;
  }

  async getFilterChanges(filters: any) {
    await this.getPayload();
    const newPayload = {
      ...this.payload,
      boarding_points: filters.boardingPoints,
      dropping_points: filters.droppingPoints,
      bus_with_amenities: filters.amenities,
      time_range: filters.time_range,
      company_id: filters.companyNames,
    };
    console.log('New payload:', newPayload);
    this.fetchBuses(newPayload);
    this.cdr.detectChanges();
  }

  // Helper method to check if we have data to display
  hasData(): boolean {
    return this.buses && this.buses.length > 0;
  }

  // Helper method to check if we should show empty state
  showEmptyState(): boolean {
    return this.hasSearched && !this.isLoading && (!this.buses || this.buses.length === 0);
  }
}
