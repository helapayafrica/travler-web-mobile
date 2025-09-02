import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {BusSeatSelectorComponent} from '../bus-seat-selector/bus-seat-selector.component';
import {CommonModule, NgIf, NgClass, NgFor, NgOptimizedImage} from '@angular/common';
import { BusSeatService } from '../bus-seat-selector/bus-seat.service';
import { forkJoin } from 'rxjs';
import {BookingService} from '../../services/booking';
import {BackendService} from '../../services/backend';

interface BusSchedule {
  companyName: string;
  busType: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  rating: number;
  seatsAvailable: number;
  pricing: {
    vip?: number;
    business?: number;
    normal: number;
  };
  amenities?: string[];
}

@Component({
  selector: 'app-component-search-results-card',
  standalone: true,
  imports: [
    CommonModule,
    NgbCollapseModule,
    BusSeatSelectorComponent,
    NgIf,
    NgClass,
    NgFor,
    NgOptimizedImage,
  ],
  templateUrl: './search-results-card.component.html',
  styleUrl: './search-results-card.component.scss',
})
export class SearchResultsCardComponent implements OnChanges {
  constructor(
    public bookingService: BookingService,
    public service: BackendService,
    public busSeatService: BusSeatService
  ) {
    this.bookingService.selectedTab$.subscribe((res : any) => {
      this.selectedTab = res;
    });
  }
  @Input() data: any[] = [];
  @Input() type: string = '';
  payload: any = {
    source_city_id: '',
    destination_city_id: '',
    travel_date: '',
    bus_id: '',
    delayedFlag: 0,
    delayedDate: '',
    sourcetype: 'web',
  };
  seat_data: any = {};
  isCollapsed = true;
  collapse: any;
  selectedTab: any = '';
  buses: any = [];
  emmittedSeatData: EmmitedSeatData = {
    collapseState: {},
    seatData: {},
    type: '',
    busData : {}
  };

  selectedBusCard : any= {}
  collapseState: { [key: number]: boolean } = {}; // Object to track collapse state
  getRatingArray(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, index) => (index < rating ? 1 : 0));
  }

  getAmenityIcon(amenity: string): string {
    const iconMap: { [key: string]: string } = {
      AC: 'bi bi-snow',
      WiFi: 'bi bi-wifi',
      USB: 'bi bi-usb',
      TV: 'bi bi-tv',
      Water: 'bi bi-cup-straw',
      Food: 'bi bi-cart',
    };

    return iconMap[amenity] || 'bi bi-plus-circle';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length) {
      this.buses = [];
      this.buses = this.data;
      this.initializeCollapseState();
    }
  }

  initializeCollapseState(): void {
    this.data.forEach((_, index) => {
      this.collapseState[index] = true; // All sections closed by default
    });
  }

  /**
   * Safely check if the schedule has amenities
   */
  hasAmenities(): boolean {
    // return Array.isArray(this.schedule.amenities) && this.schedule.amenities.length > 0;
    return true;
  }

  /**
   * Get the count of extra amenities beyond the first 3
   */
  getExtraAmenitiesCount(): number {
    // if (!Array.isArray(this.schedule.amenities) || this.schedule.amenities.length <= 3) {
    //   return 0;
    // }
    // return this.schedule.amenities.length - 3;
    return 1;
  }

  @Output() viewSeatOpen = new EventEmitter<EmmitedSeatData>();
  // toggleCollapse(index: number): void {
  //   console.log('Toggling collapse for index:', this.collapseState);
  //   this.collapseState[index] = !this.collapseState[index];
  //   this.emmittedSeatData.collapseState = { ...this.collapseState }; // clone for immutability
  //   this.emmittedSeatData.type = this.type;
  //   this.viewSeatOpen.emit({ ...this.emmittedSeatData }); // emit fresh object
  //   console.log('[Collapse state changed]', this.collapseState);
  // }

  // toggleCollapse(index: number): void {
  //   console.log('Toggling collapse for index:', this.collapseState);
  //   console.log('Toggling collapse for index:', index);
  //
  //   // Close all other collapses
  //   Object.keys(this.collapseState).forEach((key) => {
  //     this.collapseState[+key] = true; // true means collapsed
  //   });
  //
  //   // Toggle only the clicked one
  //   this.collapseState[index] = !this.collapseState[index];
  //
  //   // Emit new state
  //   this.emmittedSeatData.collapseState = { ...this.collapseState };
  //   this.emmittedSeatData.type = this.type;
  //   this.viewSeatOpen.emit({ ...this.emmittedSeatData });
  //
  //   console.log('[Collapse state changed]', this.collapseState);
  // }

  toggleCollapse(index: number): void {
    console.log('Toggling collapse for index:', index);

    const wasOpen = !this.collapseState[index]; // remember before change

    // Close all
    Object.keys(this.collapseState).forEach((key) => {
      this.collapseState[+key] = true; // true = collapsed
    });

    // If it was open, close it. If it was closed, open it.
    this.collapseState[index] = wasOpen;

    // Emit new state
    this.emmittedSeatData.collapseState = { ...this.collapseState };
    this.emmittedSeatData.type = this.type;
    this.viewSeatOpen.emit({ ...this.emmittedSeatData });

    console.log('[Collapse state changed]', this.collapseState);
  }


  async searchSeats(item: any) {
    if (this.selectedTab == 'onward') {
      this.payload.source_city_id = await this.bookingService.getConfig(
        'source_id'
      );
      this.payload.destination_city_id = await this.bookingService.getConfig(
        'destination_id'
      );
      this.payload.travel_date = await this.bookingService.getConfig(
        'travel_date'
      );
      this.payload.delayedDate = item.delayedDate;
      this.payload.bus_id = item.bus_id;
      this.bookingService.setConfig('trip', item);
      let payload_two = {
        source: this.payload.source_city_id,
        destination: this.payload.destination_city_id,
        trip: item.bus_id,
        booking_date: this.payload.travel_date,
        delayedFlag: 0,
        delayedDate: item.delayedDate,
        sourcetype: 'web',
      };
      forkJoin({
        seatData: this.service.getSeats(this.payload),
        droppingPoints: this.service.getDroppingBoardingPoint(payload_two),
      }).subscribe(({ seatData, droppingPoints }) => {
        this.seat_data = seatData;

        this.emmittedSeatData.seatData = this.seat_data;
        this.emmittedSeatData.type = this.type;

        console.log('[Collapse state changed]', this.emmittedSeatData);

        this.viewSeatOpen.emit({ ...this.emmittedSeatData });
        this.seat_data.stages = droppingPoints;
        this.busSeatService.updateSelectedSeats([]);
      });
    } else {
      this.bookingService.setConfig('trip', item);
      this.payload.source_city_id = await this.bookingService.getConfig(
        'destination_id'
      );
      this.payload.destination_city_id = await this.bookingService.getConfig(
        'source_id'
      );
      this.payload.travel_date = await this.bookingService.getConfig(
        'return_date'
      );
      this.payload.delayedDate = item.delayedDate;
      this.payload.bus_id = item.bus_id;
      let payload_two = {
        source: this.payload.source_city_id,
        destination: this.payload.destination_city_id,
        trip: item.bus_id,
        booking_date: this.payload.travel_date,
        delayedFlag: 0,
        delayedDate: item.delayedDate,
        sourcetype: 'web',
      };
      forkJoin({
        seatData: this.service.getSeats(this.payload),
        droppingPoints: this.service.getDroppingBoardingPoint(payload_two),
      }).subscribe(({ seatData, droppingPoints }) => {
        this.seat_data = seatData;
        /// emmiter
        this.emmittedSeatData.seatData = this.seat_data;
        this.emmittedSeatData.type = this.type;

        console.log('[Collapse state changed]', this.emmittedSeatData);

        this.viewSeatOpen.emit({ ...this.emmittedSeatData });
        this.seat_data.stages = droppingPoints;
        this.busSeatService.updateSelectedSeats([]);
      });
    }
  }

  getSelectedBus(bus: any){
    this.selectedBusCard = bus;
    this.emmittedSeatData.busData = bus;
    this.emmittedSeatData.type = this.type;
    this.viewSeatOpen.emit({ ...this.emmittedSeatData });
  }

}

export interface EmmitedSeatData{
  collapseState: { [key: number]: boolean };
  seatData: any;
  type: string;
  busData : any
}
