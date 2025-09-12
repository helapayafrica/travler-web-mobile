import {Component, OnInit} from '@angular/core';
import {SearchComponent as SharedSearchComponent} from '../../shared/search/search.component';
import {ResultsComponent} from './sections/results/results.component';
import {BackendService} from '../../services/backend';
import {BookingService} from '../../services/booking';
import {Breadcrumb} from 'primeng/breadcrumb';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {PrimeTemplate} from 'primeng/api';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';
import {Drawer} from 'primeng/drawer';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {FormsModule} from '@angular/forms';
import {RefineFiltersComponent} from './sections/refine-filters/refine-filters.component';

@Component({
  selector: 'app-view-search',
  standalone: true,
  imports: [
    SharedSearchComponent,
    ResultsComponent,
    Breadcrumb,
    PrimeTemplate,
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
    RouterLink,
    RouterLinkActive,
    RefineFiltersComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
buses:any=[];
constructor(public backendService:BackendService,public bookingService:BookingService){
}
ngOnInit(): void {
  console.log("Search Component is initialized!")
    this.getPayload();
    const text = this.getTextForBreadCrumb()
   const routerLink = '/search'
    this.items =  [{ text, routerLink }];
}

async getPayload(){
  let data = await this.bookingService.getPayload();

  this.backendService.getTrips(data).subscribe((res)=>{
    this.buses=res.data
    console.log('[All Buses]',this.buses)
  })
}
//BreadCrumb
  home = { label: 'Home' };
items :any = []
  isFormOpen = true;

  filterVisible = false
  toggleForm() {
    // console.log("Toggle is clicked!")
    // console.log(this.isFormOpen)
    this.isFormOpen = !this.isFormOpen;
    // console.log(this.isFormOpen)
  }
// a the filter setting for Drawer
  minValue = 0;
  maxValue = 10000;
  options: any = {
    floor: 0,
    ceil: 10000,
    step: 100,
    translate: (value: number): string => {
      return `KES ${value}`;
    }
  }

  durations = [
    { label: '3 hours', value: '3h', icon: 'bi bi-clock' },
    { label: '3-5 hours', value: '3-5h', icon: 'bi bi-hourglass-split' },
    { label: '5-7 hours', value: '5-7h', icon: 'bi bi-stopwatch' },
    { label: '7+ hours', value: '7+h', icon: 'bi bi-alarm' }
  ];
  selectedDuration = '3h';

  services = [
    { label: 'Wi-Fi', checked: false, icon: 'bi bi-wifi' },
    { label: 'TV', checked: false, icon: 'bi bi-tv' },
    { label: 'Bed', checked: false, icon: 'bi bi-moon' },
    { label: 'Meals', checked: false, icon: 'bi bi-egg-fried' }
  ];


  getTextForBreadCrumb() {
    const sourceName = this.bookingService.getConfig('source_name');
    const destinationName = this.bookingService.getConfig('destination_name');
    return `${sourceName} to ${destinationName}`;
  }
}
