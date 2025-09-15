import {Component, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefineFiltersComponent } from "../refine-filters/refine-filters.component";
import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  EmmitedSeatData,
  SearchResultsCardComponent
} from '../../../../components/search-results-card/search-results-card.component';
import {BusSeatSelectorComponent} from '../../../../components/bus-seat-selector/bus-seat-selector.component';
import {BookingService} from '../../../../services/booking';
import {BackendService} from '../../../../services/backend';



@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    SearchResultsCardComponent,
    CommonModule,
    RefineFiltersComponent,
    BusSeatSelectorComponent
],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  animations: [
    trigger('columnAnim', [
      state('hidden', style({ opacity: 0, width: '0px', overflow: 'hidden' })),
      state('visible', style({ opacity: 1, width: '*' })),
      transition('hidden <=> visible', animate('300ms ease')),
    ])
  ]
})
export class ResultsComponent implements OnChanges {

  selectedTab: string = '';
  type: any = '';
  payload: any = {};
  return_buses = [];
  constructor(
    public bookingService: BookingService,
    public backendService: BackendService
  ) {
    this.getTripType();
    this.getTab();
    this.getReturnPayload();
  }
  isReturnDisabled = true;
  @Input() data: any[] = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // console.log('Array updated:', this.data);
    }
  }
  async getTripType() {
    this.type = await this.bookingService.getConfig('trip_type');
    this.payload.date = await this.bookingService.getConfig('travel_date');
    this.payload.destination_name = await this.bookingService.getConfig(
      'destination_name'
    );
    this.payload.source_name = await this.bookingService.getConfig(
      'source_name'
    );
    this.payload.return_date = await this.bookingService.getConfig(
      'return_date'
    );
  }
  selectTab(tab: string) {
    if (!this.isReturnDisabled || tab === 'onward') {
      this.selectedTab = tab;
    }
    this.selectedTab = tab;

    if (tab === 'return') {
      // Reset previously emitted seat data
      this.busdata = null;
      this.seat_data = null;
      this.isViewSeatOpen.set(false);
    }

  }

  getTab() {
    this.bookingService.selectedTab$.subscribe((res: any) => {
      this.selectedTab = res;
    });
  }
  isReturnSelected(): boolean {
    return this.selectedTab === 'return';
  }

  async getReturnPayload() {
    let info = await this.bookingService.getReturnPayload();
    this.backendService.getTrips(info).subscribe((res: any) => {
      this.return_buses = res.data;
    });
  }
  changeTrip() {
    if (this.selectedTab === 'return') {
      this.selectedTab = 'onward';
    } else {
      this.selectedTab = 'return';
        // Reset previously emitted seat data
        this.busdata = null;
        this.seat_data = null;
        this.isViewSeatOpen.set(false);
    }
  }

  isViewSeatOpen = signal(false)

  openView() {
    this.isViewSeatOpen.set(true);
  }

  closeView() {
    // console.log('reached THe Seeter method')
    this.isViewSeatOpen.set(false);
    // console.log()
  }



  collapseState: { [key: number]: boolean } = {};
  seat_data: any = {};
  emmitedType: any = '';
  busdata : any ={}
getCollapseSeatState($event: EmmitedSeatData) {
    // console.log('[Collapse state received]', $event);
  this.collapseState = $event.collapseState;
  this.seat_data = $event.seatData;
  this.emmitedType = $event.type;
  this.busdata = $event.busData;

  this.isViewSeatOpen.set(
    Object.values(this.collapseState).some((val) => !val)
  );
}
}
