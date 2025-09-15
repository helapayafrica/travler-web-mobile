import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {BusSeatSelectorComponent} from '../bus-seat-selector/bus-seat-selector.component';
import {CommonModule, NgIf, NgClass, NgFor} from '@angular/common';

import { BusSeatService } from '../bus-seat-selector/bus-seat.service';
import { forkJoin, finalize } from 'rxjs';
import {BookingService} from '../../services/booking';
import {BackendService} from '../../services/backend';
import {Drawer} from 'primeng/drawer';

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

export interface EmmitedSeatData{
  collapseState: { [key: number]: boolean };
  seatData: any;
  type: string;
  busData : any
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
    Drawer,
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
    this.bookingService.selectedTab$.subscribe((res: any) => {
      this.selectedTab = res;
    });
  }

  @Input() data: any[] = [];
  @Input() type: string = '';
  @Input() isLoading: boolean = false; // New input for main loading state

  // Loading states
  isLoadingSeats: { [key: number]: boolean } = {};
  seatLoadError: { [key: number]: boolean } = {};

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
  visible = false;

  emittedSeatData: EmmitedSeatData = {
    collapseState: {},
    seatData: {},
    type: '',
    busData : {}
  };

  selectedBusCard : any= {};
  collapseState: { [key: number]: boolean } = {}; // Object to track collapse state
  visibleState: { [key: number]: boolean } = {};

  @Output() viewSeatOpen = new EventEmitter<EmmitedSeatData>();
  @Output() refreshRequested = new EventEmitter<void>(); // New output for refresh

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
      this.initializeLoadingStates();
    }
  }

  initializeCollapseState(): void {
    this.data.forEach((_, index) => {
      this.collapseState[index] = true; // All sections closed by default
      this.visibleState[index] = false;
    });
  }

  initializeLoadingStates(): void {
    this.data.forEach((_, index) => {
      this.isLoadingSeats[index] = false;
      this.seatLoadError[index] = false;
    });
  }

  /**
   * Check if data is empty
   */
  get isEmpty(): boolean {
    return !this.data || this.data.length === 0;
  }

  /**
   * Refresh search functionality
   */
  onRefreshSearch(): void {
    this.refreshRequested.emit();
  }

  toggleCollapse(index: number): void {
    // console.log('Toggling collapse for index:', index);

    const wasOpen = !this.collapseState[index]; // remember before change

    // Close all
    Object.keys(this.collapseState).forEach((key) => {
      this.collapseState[+key] = true; // true = collapsed
      this.visibleState[+key] = false;
    });

    // If it was open, close it. If it was closed, open it.
    this.collapseState[index] = wasOpen;
    this.visibleState[index] = !wasOpen;

    // Emit new state
    this.emittedSeatData.collapseState = { ...this.collapseState };
    this.emittedSeatData.type = this.type;
    this.viewSeatOpen.emit({ ...this.emittedSeatData });

    // console.log('[Collapse state changed]', this.collapseState);
  }

  async searchSeats(item: any, index: number) {
    // Set loading state for this specific bus
    this.isLoadingSeats[index] = true;
    this.seatLoadError[index] = false;

    try {
      if (this.selectedTab == 'onward') {
        this.payload.source_city_id = await this.bookingService.getConfig('source_id');
        this.payload.destination_city_id = await this.bookingService.getConfig('destination_id');
        this.payload.travel_date = await this.bookingService.getConfig('travel_date');
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
        })
          .pipe(
            finalize(() => {
              this.isLoadingSeats[index] = false;
            })
          )
          .subscribe({
            next: ({ seatData, droppingPoints }) => {
              this.seat_data = seatData;
              this.emittedSeatData.seatData = this.seat_data;
              this.emittedSeatData.type = this.type;

              // console.log('[Seat data loaded]', this.emittedSeatData);

              this.viewSeatOpen.emit({ ...this.emittedSeatData });
              this.seat_data.stages = droppingPoints;
              this.busSeatService.updateSelectedSeats([]);
            },
            error: (error) => {
              console.error('Error loading seats:', error);
              this.seatLoadError[index] = true;
            }
          });
      } else {
        // Return journey logic
        this.bookingService.setConfig('trip', item);
        this.payload.source_city_id = await this.bookingService.getConfig('destination_id');
        this.payload.destination_city_id = await this.bookingService.getConfig('source_id');
        this.payload.travel_date = await this.bookingService.getConfig('return_date');
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
        })
          .pipe(
            finalize(() => {
              this.isLoadingSeats[index] = false;
            })
          )
          .subscribe({
            next: ({ seatData, droppingPoints }) => {
              this.seat_data = seatData;
              this.emittedSeatData.seatData = this.seat_data;
              this.emittedSeatData.type = this.type;

              console.log('[Seat data loaded]', this.emittedSeatData);

              this.viewSeatOpen.emit({ ...this.emittedSeatData });
              this.seat_data.stages = droppingPoints;
              this.busSeatService.updateSelectedSeats([]);
            },
            error: (error) => {
              console.error('Error loading seats:', error);
              this.seatLoadError[index] = true;
            }
          });
      }
    } catch (error) {
      console.error('Error in searchSeats:', error);
      this.isLoadingSeats[index] = false;
      this.seatLoadError[index] = true;
    }
  }

  /**
   * Retry loading seats after error
   */
  reloadSeats(item: any, index: number): void {
    this.searchSeats(item, index);
  }

  getSelectedBus(bus: any){
    this.selectedBusCard = bus;
    this.emittedSeatData.busData = bus;
    this.emittedSeatData.type = this.type;
    this.viewSeatOpen.emit({ ...this.emittedSeatData });
  }

  // Check the price
  private seatPriority: string[] = ['normal', 'bclass', 'vip'];

  getPreferredSeat(item: { defaultTripPriceList?: Array<{ seatType: string; amount: number }> }) {
    const list = item?.defaultTripPriceList ?? [];
    for (const type of this.seatPriority) {
      const found = list.find(p => p.seatType === type);
      if (found) return found; // preserves amount = 0 as valid
    }
    return null;
  }

  getPreferredAmount(item: { defaultTripPriceList?: Array<{ seatType: string; amount: number }> }): number | null {
    const seat = this.getPreferredSeat(item);
    return seat?.amount ?? null;
  }

  closeDrawerFromEmmiter( bool: boolean, i: number) {
    if(bool){
      this.toggleCollapse(i)
    }


  }
}
