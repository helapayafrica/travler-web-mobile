import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
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
    BusSeatSelectorComponent,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  animations: [
    trigger('columnAnim', [
      state('hidden', style({ opacity: 0, width: '0px', overflow: 'hidden' })),
      state('visible', style({ opacity: 1, width: '*' })),
      transition('hidden <=> visible', animate('300ms ease')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnChanges, OnInit {
  selectedTab: string = 'onward';
  type: any = '';
  payload: any = {};
  return_buses = [];

  constructor(
    public bookingService: BookingService,
    public backendService: BackendService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.getTripType();
    this.getTab();
    this.getReturnPayload();

    // 👇 Normalize state after reload
    setTimeout(() => {
      if (this.type === 'twoway' && this.selectedTab !== 'onward') {
        this.selectedTab = 'onward';
        this.bookingService.setConfig('selectedTab','onward'); // if your service supports it
        this.cdr.markForCheck();
      }
    }, 0);
  }

  isReturnDisabled = true;
  @Input() data: any[] = [];
  @Input() isLoading: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    // console.log('[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]');
    // console.log('ResultsComponent ngOnChanges triggered', changes);
  }

  async getTripType() {
    this.type = await this.bookingService.getConfig('trip_type');
    this.payload.date = await this.bookingService.getConfig('travel_date');
    this.payload.destination_name = await this.bookingService.getConfig('destination_name');
    this.payload.source_name = await this.bookingService.getConfig('source_name');
    this.payload.return_date = await this.bookingService.getConfig('return_date');

      if (this.type === 'twoway') {
        this.selectedTab = 'onward';
      } else if (this.type === 'reschedule') {
        this.selectedTab = 'reschedule';
      } else {
        this.selectedTab = 'onward';
      }
      this.cdr.detectChanges();
  }


  selectTab(tab: string) {
    if (!this.isReturnDisabled || tab === 'onward') {
      this.selectedTab = tab;
    }
    this.selectedTab = tab;

    if (tab === 'return' || tab == '') {
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
      this.busdata = null;
      this.seat_data = null;
      this.isViewSeatOpen.set(false);
    }
  }

  isViewSeatOpen = signal(false);

  openView() {
    this.isViewSeatOpen.set(true);
  }

  closeView() {
    this.isViewSeatOpen.set(false);
  }

  collapseState: { [key: number]: boolean } = {};
  seat_data: any = {};
  emmitedType: any = '';
  busdata: any = {};

  getCollapseSeatState($event: EmmitedSeatData) {
    this.collapseState = $event.collapseState;
    this.seat_data = $event.seatData;
    this.emmitedType = $event.type;
    this.busdata = $event.busData;

    this.isViewSeatOpen.set(Object.values(this.collapseState).some((val) => !val));
  }
}
