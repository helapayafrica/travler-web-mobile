import {assertPlatform, Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {NgForOf} from '@angular/common';
import {Button} from 'primeng/button';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Drawer} from 'primeng/drawer';
import {FormsModule} from '@angular/forms';
import {BackendService} from '../../../../services/backend';
import {BookingService} from '../../../../services/booking';

@Component({
  selector: 'app-search-refine-filters',
  standalone: true,
  imports: [NgxSliderModule, Button, TabPanel, Drawer, Tabs, TabList, Tab, FormsModule, TabPanels, NgForOf],
  templateUrl: './refine-filters.component.html',
  styleUrl: './refine-filters.component.scss'
})
export class RefineFiltersComponent implements OnInit {
  bookingService = inject(BookingService)
  service = inject(BackendService)
  filterVisible: boolean = false;
  @Output() filterChangeEmitter = new EventEmitter<any>();
  minValue: number = 1000;
  maxValue: number = 5000;
  options: any = {
    floor: 1000,
    ceil: 5000,
    step: 25,
    translate: (value: number): string => {
      return `KES ${value}`;
    }
  };

  filteredBuses: any[] = [];
  selectedServices: string[] = [];
  selectedDuration: string = '';
  selectedRanges: string[] = [];
  selectedBusTypes: string[] = []
  selectedAmenities: string[] = []
  busTypes: string[] = [];
  selectedBusNames: string[] = []
  selectedBoardingPoints: string[] = []
  selectedDroppingPoints: string[] = []
  timeRanges: { id: string; name: unknown }[] = [];
  busNames: { id: string; name: any }[] = [];
  boardingPoints: { id: string; name: unknown }[] = []
  droppingPoints: { id: string; name: unknown }[] = []
  departureTime: string[] = []
  amenities: { id: string; name: unknown }[] = []

  durations = [
    {label: '3 hours', value: '3h', icon: 'bi bi-clock'},
    {label: '3-5 hours', value: '3-5h', icon: 'bi bi-hourglass-split'},
    {label: '5-7 hours', value: '5-7h', icon: 'bi bi-stopwatch'},
    {label: '7+ hours', value: '7+h', icon: 'bi bi-alarm'}
  ];
  //  todo : use the correct obj
  services = [
    {label: 'Wi-Fi', checked: false, icon: 'bi bi-wifi'},
    {label: 'TV', checked: false, icon: 'bi bi-tv'},
    {label: 'Bed', checked: false, icon: 'bi bi-moon'},
    {label: 'Meals', checked: false, icon: 'bi bi-egg-fried'}
  ];
  // todo : use the cottent Obj
  serviceMap = {
    'wifi': '1',
    'tv': '2',
    'bed': '3',
    'meals': '4'
  };

  ngOnInit(): void {
    // this.getDroppingAndBoardingPointDetails()
    const data = {
      source_city_id: this.bookingService.getConfig('source_id'),
      destination_city_id: this.bookingService.getConfig('destination_id')
    }
    this.service.getFilterOptions(data).subscribe({
      next: (res: any) => {
        console.log('[Fitler options]')
        console.log(res)
        this.busNames = Object.entries(res.company).map(([id, name]) => ({
          id,
          name
        }));      // [ [id, name], ... ]
        this.boardingPoints = Object.entries(res.boardingPoint).map(([id, name]) => ({
          id,
          name
        }));
        this.droppingPoints = Object.entries(res.droppingPoint).map(([id, name]) => ({
          id,
          name
        }));
        this.amenities = Object.entries(res.amenities).map(([id, name]) => ({
          id,
          name
        }));
        this.timeRanges = Object.entries(res.timeRange).map(([id, name]) => ({
          id,
          name
        }));

        console.log(this.busNames)
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }

  onBoardingPointSelectionChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const idx = this.selectedBoardingPoints.indexOf(value);
    console.log(idx)

    if (idx > -1) {
      // id already selected → remove it
      this.selectedBoardingPoints.splice(idx, 1);
    } else {
      // id not yet selected → add it
      this.selectedBoardingPoints.push(value);
    }

    console.log(this.selectedBoardingPoints);
  }

  onDroppingPointSelectionChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const idx = this.selectedDroppingPoints.indexOf(value);
    console.log(idx)

    if (idx > -1) {
      // id already selected → remove it
      this.selectedDroppingPoints.splice(idx, 1);
    } else {
      // id not yet selected → add it
      this.selectedDroppingPoints.push(value);
    }

    console.log(this.selectedDroppingPoints);
  }

  onDepartureTimeSelectionChange(event: Event) {
    const time = (event.target as HTMLInputElement).value;
    const idx = this.selectedRanges.indexOf(time);
    console.log(idx)

    if (idx > -1) {
      // id already selected → remove it
      this.selectedRanges.splice(idx, 1);
    } else {
      // id not yet selected → add it
      this.selectedRanges.push(time);
    }

    console.log(this.selectedRanges);
  }

  onAmenitiesSelectionChange(event: Event) {
    const amenity = (event.target as HTMLInputElement).value;
    const idx = this.selectedAmenities.indexOf(amenity);
    console.log(idx)

    if (idx > -1) {
      // id already selected → remove it
      this.selectedAmenities.splice(idx, 1);
    } else {
      // id not yet selected → add it
      this.selectedAmenities.push(amenity);
    }

    console.log(this.selectedAmenities);
  }

  onCompanySelectionChange(event: Event) {
    const c_name = (event.target as HTMLInputElement).value;
    const idx = this.selectedBusNames.indexOf(c_name);
    console.log(idx)
    if (idx > -1) {
      // id already selected → remove i
      this.selectedBusNames.splice(idx, 1);
    } else {
      // id not yet selected → add it
      this.selectedBusNames.push(c_name);
    }
    console.log(this.selectedBusNames);
  }


  clearAllFilters(){
      this.selectedBusNames = []
    this.selectedBoardingPoints = []
    this.selectedDroppingPoints = []
    this.selectedRanges = []
    this.selectedAmenities = []
    // this.selectedBusTypes = []
    // this.selectedServices = []
    this.selectedDuration = ''
    this.filteredBuses = []
    this.filterVisible = false

    const filters = {
      boardingPoints: this.selectedBoardingPoints,
      droppingPoints: this.selectedDroppingPoints,
      amenities: this.selectedAmenities,
      companyNames: this.selectedBusNames,
      time_range: this.selectedRanges,
    }
    console.log('[ITMe]', this.selectedRanges,)
    this.filterChangeEmitter.emit(filters)

  }

  applyFilter(){
    // get all arrays and make the an object
    const filters = {
      boardingPoints: this.selectedBoardingPoints,
      droppingPoints: this.selectedDroppingPoints,
      time_range: this.selectedRanges,
      amenities: this.selectedAmenities,
      companyNames: this.selectedBusNames,
    }
    this.filterChangeEmitter.emit(filters)
  }


  protected readonly assertPlatform = assertPlatform;
}
