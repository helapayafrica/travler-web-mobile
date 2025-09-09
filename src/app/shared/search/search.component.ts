 import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import {CommonModule, DatePipe} from '@angular/common';
import {ViewChild, ElementRef} from '@angular/core';
import {DatePicker, DatePickerModule} from 'primeng/datepicker';
import {group} from '@angular/animations';
import {BookingService} from '../../services/booking';
import {MessageService} from '../../services/message.service';
import {BackendService} from '../../services/backend';
import {CouponInsuredService} from '../../services/coupon-insured.service';

@Component({
  selector: 'app-shared-search',
  standalone: true,
  imports: [
    CommonModule,
    DatePickerModule,
    ReactiveFormsModule,
    TypeaheadModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [DatePipe],
})
export class SearchComponent implements OnInit {

  messageService = inject(MessageService)

  cities: any = [];
  destinations: any = [];
  searchForm: FormGroup;
  filteredFromCities: Observable<{ id: string; city_name: string }[]>;
  filteredDestinationCities: Observable<{ id: string; city_name: string }[]>;
  message = this.messageService.getMessage()
  today = new Date()


  constructor(
    public backendService: BackendService,
    private fb: FormBuilder,
    public bookingService: BookingService,
    public datePipe: DatePipe,
    public router: Router
  ) {
    this.searchForm = this.fb.group({
      fromCity: ['', Validators.required],
      destinationCity: ['', Validators.required],
      date: [this.today, [Validators.required, futureDateValidator()]],
      return_date: [this.today, [futureDateValidator()]], // Set default to new Date()
      trip_type: ['onward'],
    }, {validators: returnDateAfterTravelValidator()});

    // console.log('[Date on Init]')
    // console.log(this.searchForm.value)


    this.filteredFromCities = this.searchForm
      .get('fromCity')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCities(value || ''))
      );

    this.filteredDestinationCities = this.searchForm
      .get('destinationCity')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterDestinations(value || ''))
      );


    // console.log('[ filtered City]', this.filteredFromCities)
    // console.log('[ filtered City]', this.filteredDestinationCities)
  }

  @ViewChild('travelDateInput') travelDatePicker: any;
  @ViewChild('returnDateInput') returnDatePicker: any;

  async ngOnInit(): Promise<void> {
    this.bookingService.setSelectedTab('onward');

    const data: any = {
      destinationCity: await this.bookingService.getConfig('destination_name'),
      fromCity: await this.bookingService.getConfig('source_name'),
      date: await this.bookingService.getConfig('travel_date'),
      return_date: await this.bookingService.getConfig('return_date'),
      trip_type: await this.bookingService.getConfig('trip_type'),
    };

    // console.log('Raw config data:', data);

    const safeDate = (val: any, fallback: Date = this.today): Date => {
      if (!val || val === 'null' || val === 'undefined') return fallback;

      if (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const parts = val.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);
        return isNaN(d.getTime()) ? fallback : d;
      }

      const d = new Date(val);
      return isNaN(d.getTime()) ? fallback : d;
    };

    const processedTravelDate = safeDate(data.date, this.today);
    const processedReturnDate = safeDate(data.return_date, this.today);

    // console.log('Processed dates:', {travel: processedTravelDate, return: processedReturnDate});

    this.tripType = data.trip_type || 'onward';
    this.searchForm.patchValue({
      date: processedTravelDate,
      return_date: this.tripType === 'twoway' ? processedReturnDate : null,
      destinationCity: data.destinationCity || '',
      fromCity: data.fromCity || '',
      trip_type: this.tripType
    });


    setTimeout(() => {
      if (this.travelDateInput && processedTravelDate) {
        // console.log('Setting travel date on datepicker:', processedTravelDate);
        this.travelDateInput.writeValue(processedTravelDate);
        this.searchForm.get('date')?.setValue(processedTravelDate);
      }

      if (this.returnDateInput && processedReturnDate && this.tripType === 'twoway') {
        // console.log('Setting return date on datepicker:', processedReturnDate);
        this.returnDateInput.writeValue(processedReturnDate);
        this.searchForm.get('return_date')?.setValue(processedReturnDate);
      }

      // Force validation
      this.searchForm.get('date')?.updateValueAndValidity();
      this.searchForm.get('return_date')?.updateValueAndValidity();
      this.searchForm.updateValueAndValidity();

      // console.log('Final form values:', this.searchForm.value);
    }, 100); // Increased timeout to ensure ViewChild is ready

    // console.log('hiiiiiiii')
    this.backendService.getCities().subscribe({
      next : (res) => {
        this.cities = res.data;
        // console.log('[Cities]', this.cities)
      },
      error: (err) => {
        console.log('[Cities]', err)
      }
    });




    this.focusInput('fromCity');
  }

  private _filterCities(value: string): { id: string; city_name: string }[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city: any) =>
      city.city_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterDestinations(
    value: string
  ): { id: string; city_name: string }[] {
    const filterValue = value.toLowerCase();
    return this.destinations.filter((city: any) =>
      city.city_name.toLowerCase().includes(filterValue)
    );
  }

  couponService = inject(CouponInsuredService)

  onSubmit(): void {
    this.couponService.clearCancellationProtectionAndInsuredSeats()
    let data = this.searchForm.value;
    // console.log('Form data:', data);
    const date = this.formatDateForConfig(data.date);
    const return_date = this.formatDateForConfig(data.return_date);

    // console.log('Form data:', data);
    // console.log('Formatted dates:', date, return_date);

    this.bookingService.setConfig('travel_date', date);
    if (data.return_date && this.tripType == 'twoway') {
      this.bookingService.setConfig('return_date', return_date);
      this.bookingService.setConfig('trip_type', 'twoway');
    } else {
      this.bookingService.setConfig('trip_type', 'onward');
      this.bookingService.setConfig('return_date', null);
    }
    this.router.navigateByUrl('/search');
  }

  onCitySelected(event: any): void {
    const selectedCity = event.item.city_name;
    let id = event.item.id;
    this.bookingService.setConfig('source_name', selectedCity);
    this.bookingService.setConfig('source_id', id);
    this.backendService.getDestinations(id).subscribe((res) => {
      this.destinations = res.data;

    });
  }

  onDestinationSelected(event: any): void {
    const selectedCity = event.item.city_name;
    let id = event.item.id;
    this.bookingService.setConfig('destination_name', selectedCity);
    this.bookingService.setConfig('destination_id', id);
  }

  onDateSelected(event: any): void {
    const selectedDate = event.value;
    // console.log(this.datePipe.transform(selectedDate, 'YYYY-MM-dd'));
  }

  //   round trip
  tripType: any = 'twoway';

  setTripType(type: string) {
    this.tripType = type;
    this.searchForm.patchValue({
      trip_type: type,
    })
    // console.log('Trip type set to:', this.tripType);
    if (type === 'onward') {
      this.bookingService.setConfig('return_date', null);
      this.searchForm.patchValue({
        trip_type: type,
        return_date: null,
      })
      this.bookingService.setSelectedTab('onward');
      this.searchForm.updateValueAndValidity()
    } else {
      this.bookingService.setSelectedTab('onward');
    }
  }

  setToday() {
    const today = new Date();
    this.searchForm.get('date')?.setValue(today); // directly set Date object
    setTimeout(() => {
      this.travelDateInput!.hideOverlay()
    }, 0)

  }

  setTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.searchForm.get('date')?.setValue(tomorrow); // directly set Date object
    this.travelDateInput!.hideOverlay()
    setTimeout(() => {
      this.travelDateInput!.hideOverlay()
    }, 0)
  }


  @ViewChild('fromCityInput') fromCityInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toCityInput') toCityInput!: ElementRef<HTMLInputElement>;
  @ViewChild('travelDateInput') travelDateInput!: DatePicker;
  @ViewChild('returnDateInput') returnDateInput!: DatePicker;


  toggleDate = false

  toggleTheDate() {
    this.toggleDate = !this.toggleDate;
  }

  focusInput(inputName: 'fromCity' | 'toCity' | 'travelDate' | 'returnDate') {
    if (inputName === 'fromCity') {
      this.fromCityInput.nativeElement.focus();
      this.messageService.setMessage('fromCity')
    }
    if (inputName === 'toCity') {
      this.toCityInput.nativeElement.focus();
      this.messageService.setMessage('toCity')
    }
    if (inputName === 'travelDate') {
      this.travelDateInput!.showOverlay()
      this.messageService.setMessage('travelDate')
    }
    if (inputName === 'returnDate') {
      this.returnDateInput!.showOverlay()
      this.messageService.setMessage('returnDate')
    }
  }

  private formatDateForConfig(date: string | Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  private formatDateForInput(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // "2025-08-25"
  }

}

/// date validator =>
export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }
    const selectedDate = new Date(control.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today ? null : {pastDate: true};
  };
}

export function returnDateAfterTravelValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('date')?.value;
    const end = group.get('return_date')?.value;
    const tripType = group.get('trip_type')?.value;
    if (!start || !end) return null;

    const d1 = new Date(start);
    const d2 = new Date(end)

    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);


    if (tripType === 'onward') {
      group.get('return_date')?.setErrors(null);
      return null;
    }
    return d2 > d1 ? null : {returnDateAfterTravel: true}
  }
}

