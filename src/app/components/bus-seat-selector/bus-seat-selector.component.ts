import {
  Component,
  ElementRef, EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {BusSeatService} from './bus-seat.service';
import {HttpClientModule} from '@angular/common/http';
import {seatAnimations, tooltipAnimations, fadeInAnimation} from './bus-seat.animations';
import {SeatStyles} from './seat-styles';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ResultsComponent} from '../../views/search/sections/results/results.component';
import {LoginModalService} from '../../services/login-modal';
import {BookingService} from '../../services/booking';
import {Select} from 'primeng/select';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../services/auth';
import Swal from 'sweetalert2';

interface SeatData {
  left: string;
  top: string;
  seat_id: string;
  seat_width: string;
  seat_height: string;
  seat_name: string;
  seat_type: string;
  seat_type_id: string;
  seat_color: string;
  selection_status: boolean;
}

interface PriceData {
  normal: { price: string }[];
  vip: { price: string }[];
  bclass: { price: string }[];
}

@Component({
  selector: 'app-component-bus-seat-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Select, TranslatePipe],
  animations: [seatAnimations, tooltipAnimations, fadeInAnimation],
  templateUrl: './bus-seat-selector.component.html',
  styleUrl: './bus-seat-selector.component.scss',
})
export class BusSeatSelectorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() payload: any = [];
  @Input() type: string = '';
  @Input() busData: any = {};
  @Input() current!: number;
  @Output() close = new EventEmitter<boolean>(false);
  isReturnStep: boolean = false;
  seatData: SeatData[] = [];
  selectedSeats: SeatData[] = [];
  priceList!: PriceData;
  isLoading = true;
  error: string | null = null;
  isMobileView = false;
  isLargeView = true;
  isTabletView = false;
  seatStyles = SeatStyles; // Make styles available to component
  busLayoutHeight = 300; // Default height
  centerOffsetX = 0; // Used to center seats
  centerOffsetY = 0; // Used to center seats
  boardingForm!: FormGroup;
  stages: any = {};
  selectedTab: any = '';
  private router = inject(Router);

  constructor(
    private busSeatService: BusSeatService,
    private fb: FormBuilder,
    public bookingService: BookingService,
    public loginModalService: LoginModalService,
  ) {
    this.checkMobileView();
    this.bookingService.selectedTab$.subscribe((res) => {
      this.selectedTab = res;
    });
  }

  ngOnInit() {
    this.boardingForm = this.fb.group({
      boarding: ['', Validators.required],
      dropping: ['', Validators.required],
    });
    this.checkMobileView();
    this.updateLayoutDimensions();
    this.bookingService.selectedTab$.subscribe((res) => {
      if (res == 'return') {
        this.isReturnStep = true;
      }
    });
    this.busSeatService.selectedSeats$.subscribe((seats) => (this.selectedSeats = seats));

    // this.getTimer()
    // Start the timer updates
    this.startTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payload']) {
      this.seatData = this.payload.data;
      this.priceList = this.payload.priceList;
      // console.log(this.priceList)
      // this.bookingService.setConfig('priceList', this.priceList);
      if (this.priceList) {
        this.bookingService.setConfig('priceList', this.priceList);
      }
      this.stages = this.payload.stages;
      this.isLoading = false;
      // this.getTimer()
      // Calculate center offsets after data is loaded
      setTimeout(() => this.calculateCenterOffset(), 100);
    }
  }

  submitForm() {
    if (this.boardingForm.valid) {
      // console.log('Selected Points:', this.boardingForm.value);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileView();
    this.updateLayoutDimensions();
    this.calculateCenterOffset();
  }

  checkMobileView() {
    const wasMobile = this.isMobileView;
    this.isMobileView = window.innerWidth < 768;
    this.isLargeView = window.innerWidth > 1000;
    this.isTabletView = window.innerWidth > 768 && window.innerWidth < 1000;

    // If mobile state changed, update the layout
    if (wasMobile !== this.isMobileView) {
      this.updateLayoutDimensions();
      // Add a small delay to calculate offsets after layout changes
      setTimeout(() => this.calculateCenterOffset(), 100);
    }
  }

  updateLayoutDimensions() {
    // Calculate better dimensions for the bus layout based on screen size
    if (this.isMobileView) {
      // For mobile, make the bus layout taller to accommodate the vertical orientation
      this.busLayoutHeight = Math.min(window.innerHeight * 0.6, 480);
    } else if (this.isTabletView) {
      this.busLayoutHeight = Math.min(window.innerHeight * 0.6, 480);
    } else {
      // For desktop, use the original height
      this.busLayoutHeight = 600;
    }
  }

  /**
   * Calculate the center offset for the seats to properly position them
   * This helps ensure the seats are centered in the bus layout
   */

  // Get only driver and door seats for mobile layout
  getDriverAndDoorSeats() {
    return this.seatData.filter((seat) => seat.seat_type === 'driver' || seat.seat_type === 'door');
  }

  getSeatClass(seat: SeatData): string {
    return seat.seat_type;
  }

  isSelected(seat: SeatData): boolean {
    return this.selectedSeats.some((s) => s.seat_id === seat.seat_id);
  }
  //
  // toggleSeat(seat: SeatData): void {
  //   // che if logged in max seats is 6 if not logged in mmxa is 2
  //   if (!seat.selection_status) {
  //     const updatedSelection = this.busSeatService.toggleSeat(seat, this.selectedSeats);
  //     this.busSeatService.updateSelectedSeats(updatedSelection);
  //   }
  // }
  // async toggleSeat(seat: SeatData): Promise<void> {
  //   const loggedIn = this.bookingService.getConfig('loggedInStatus');
  //   const maxSeats = loggedIn ? 6 : 2;

  //   // Check if seat is already selected
  //   const isAlreadySelected = this.isSelected(seat)

  //   // If deselecting, always allow it
  //   if (isAlreadySelected) {
  //     const updatedSelection = this.busSeatService.toggleSeat(seat, this.selectedSeats);
  //     this.busSeatService.updateSelectedSeats(updatedSelection);
  //     return;
  //   }

  //   // Now check limits only for NEW selections
  //   if (this.selectedSeats.length >= maxSeats) {
  //     if (!loggedIn) {
  //       const result = await Swal.fire({
  //         title: 'Login Required',
  //         text: 'You can only select up to 2 seats without logging in. Login to book more seats.',
  //         icon: 'info',
  //         showCancelButton: true,
  //         confirmButtonText: 'Login',
  //         cancelButtonText: 'Cancel',
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //       });

  //       if (result.isConfirmed) {
  //         this.loginModalService.openModal(this.router.url);
  //       }
  //     } else {
  //       await Swal.fire({
  //         title: 'Limit Reached',
  //         text: `You can select up to ${maxSeats} seats per booking.`,
  //         icon: 'warning',
  //         confirmButtonText: 'OK',
  //         confirmButtonColor: '#3085d6',
  //       });
  //     }
  //     return;
  //   }

  //   // Proceed with new selection
  //   const updatedSelection = this.busSeatService.toggleSeat(seat, this.selectedSeats);
  //   this.busSeatService.updateSelectedSeats(updatedSelection);
  // }

  async toggleSeat(seat: SeatData): Promise<void> {
    const loggedIn = this.bookingService.getConfig('loggedInStatus');
    let maxSeats = loggedIn ? 6 : 1;

    // ✅ Step 1: handle deselection first (always allowed)
    const isAlreadySelected = this.isSelected(seat);
    if (isAlreadySelected) {
      const updatedSelection = this.busSeatService.toggleSeat(seat, this.selectedSeats);
      this.busSeatService.updateSelectedSeats(updatedSelection);
      return;
    }

    // ✅ Step 2: apply special return limit if two-way
    if (this.type === 'twoway' && this.selectedTab === 'return') {
      const booking: any = await this.bookingService.getConfig('booking');
      const onwardPassengerLength = booking?.ticketDetail?.onwardticket?.passenger?.length || 0;
      console.log("Booking Details for onward trip:");
      console.log(booking);

      console.log("TOggle seat part");
      console.log(onwardPassengerLength);


      // Return limit = onward passenger count
      maxSeats = onwardPassengerLength;

      if (this.selectedSeats.length >= maxSeats) {
        await Swal.fire({
          title: 'Limit Reached',
          text: `You can select up to ${maxSeats} seats for your return trip as per onward booking.`,
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
        return;
      }
    }

    // ✅ Step 3: handle general seat limit
    if (this.selectedSeats.length >= maxSeats) {
      if (!loggedIn) {
        const result = await Swal.fire({
          title: 'Login Required',
          text: 'You can only select up to 2 seats without logging in. Login to book more seats.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        });

        if (result.isConfirmed) {
          this.loginModalService.openModal(this.router.url);
        }
      } else {
        await Swal.fire({
          title: 'Limit Reached',
          text: `You can select up to ${maxSeats} seats per booking.`,
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
      }
      return;
    }

    // ✅ Step 4: proceed with selection
    const updatedSelection = this.busSeatService.toggleSeat(seat, this.selectedSeats);
    this.busSeatService.updateSelectedSeats(updatedSelection);
  }

  getSelectedSeatsString(): string {
    return this.selectedSeats
      .map((seat) => seat.seat_name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .join(', ');
  }

  getSeatTypesSummary(): string {
    const types = this.selectedSeats.reduce(
      (acc, seat) => {
        acc[seat.seat_type] = (acc[seat.seat_type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(types)
      .map(([type, count]) => `${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`)
      .join(' • ');
  }

  // calculateTotalPrice(): string {
  //   // console.log('Calculating total price for selected seats:');
  //   // console.log(this.priceList);
  //
  //   if (!this.priceList || !this.selectedSeats?.length) {
  //     return '0';
  //   }
  //
  //   const total = this.selectedSeats.reduce((sum, seat) => {
  //     let price = 0;
  //     switch (seat.seat_type) {
  //       case 'normal':
  //         price = parseFloat(this.priceList.normal[0].price);
  //         break;
  //       case 'vip':
  //         price = parseFloat(this.priceList.vip[0].price);
  //         break;
  //       case 'bclass':
  //         price = parseFloat(this.priceList.bclass[0].price);
  //         break;
  //     }
  //     return sum + price;
  //   }, 0);
  //
  //   return total.toLocaleString();
  // }
  calculateTotalPrice(): string {
    if (!this.priceList || !this.selectedSeats?.length) {
      return '0';
    }

    const total = this.selectedSeats.reduce((sum, seat) => {
      const priceStr =
        seat.seat_type === 'normal' ? this.priceList.normal?.[0]?.price :
          seat.seat_type === 'vip' ? this.priceList.vip?.[0]?.price :
            seat.seat_type === 'bclass' ? this.priceList.bclass?.[0]?.price : '0';

      return sum + (parseFloat(priceStr) || 0);
    }, 0);

    return total.toLocaleString();
  }

  // async proceedToCheckout(): Promise<void> {
  //   this.close.emit(true);
  //   if (this.type === 'onward') {
  //     this.bookingService.setConfig('pickup', this.boardingForm.value);
  //     await this.bookingService.saveOutward();
  //     const loggedinStatus = this.bookingService.getConfig('loggedInStatus');
  //     const userData = this.bookingService.getConfig('userData');
  //     console.log(loggedinStatus &&  userData)
  //   } else if (this.type === 'return') {
  //   } else {
  //     this.bookingService.setConfig('pickup', this.boardingForm.value);
  //     await this.bookingService.saveReturn();
  //     this.loginModalService.openModal(this.router.url);
  //   }
  // }
  authService = inject(AuthService);
  async proceedToCheckout(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    const loggedInStatus = this.bookingService.getConfig('loggedInStatus');
    if (this.type === 'onward') {
      this.bookingService.setConfig('pickup', this.boardingForm.value);
      await this.bookingService.saveOutward();
      if (user && loggedInStatus == true) {
        await this.router.navigateByUrl('/checkout');
      } else {
        this.loginModalService.openModal('/checkout');
      }
    } else {
      this.bookingService.setConfig('pickup', this.boardingForm.value);
      await this.bookingService.saveReturn();
      this.loginModalService.openModal('/checkout');
    }
  }

  async proceedToReturn() {
    this.close.emit(true);
    this.bookingService.setConfig('pickup', this.boardingForm.value);
    await this.bookingService.saveOutward();
    this.busSeatService.updateSelectedSeats([]);
    this.bookingService.setSelectedTab('return');
    // to do change the
    this.closeIsOpenView();
  }

  // Helper method to check if maximum seats are selected (optional)
  isMaxSeatsSelected(): boolean {
    return this.selectedSeats.length < 6; // Assuming max 4 seats per booking
  }

  // Error handling helper method
  handleError(error: any): void {
    this.error = 'An error occurred while processing your request';
    console.error('Error:', error);
  }

  getTypePriceString(type: string): string {
    if (!this.priceList) {
      return '0';
    }

    switch (type) {
      case 'vip':
        return this.priceList.vip && this.priceList.vip.length > 0
          ? this.priceList.vip[0].price
          : '1,600';
      case 'bclass':
        return this.priceList.bclass && this.priceList.bclass.length > 0
          ? this.priceList.bclass[0].price
          : '1,300';
      case 'normal':
        return this.priceList.normal && this.priceList.normal.length > 0
          ? this.priceList.normal[0].price
          : '1,200';
      default:
        return '0';
    }
  }

  getSeatState(seat: SeatData): string {
    if (seat.selection_status) return 'unavailable';
    if (this.isSelected(seat)) return 'selected';
    return 'available';
  }

  @ViewChild('busContainer', { static: false }) busContainer!: ElementRef;
  scaleFactor = 1;
  cardScaleFactor = 1;
  containerWidth = 0;
  containerHeight = 0;

  maxY = 400;
  // updated
  calculateCenterOffset() {
    if (!this.seatData || this.seatData.length === 0 || !this.busContainer) return;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    this.seatData.forEach((seat) => {
      const left = parseInt(seat.left);
      const top = parseInt(seat.top);
      const width = parseInt(seat.seat_width);
      const height = parseInt(seat.seat_height);

      minX = Math.min(minX, left);
      minY = Math.min(minY, top);
      maxX = Math.max(maxX, left + width);
      maxY = Math.max(maxY, top + height);
      this.maxY = maxY;
    });

    // console.log('[Max X i]', maxY)

    const seatLayoutWidth = maxX - minX;
    const seatLayoutHeight = maxY - minY;

    const containerWidth = this.busContainer.nativeElement.offsetWidth;
    const containerHeight = this.busContainer.nativeElement.offsetHeight;

    const containerClientWidth = this.busContainer.nativeElement.clientWidth;

    // scale only horizontally
    // console.log(containerWidth, ' => [Container Width]')
    // console.log(seatLayoutWidth, ' => [Seat Layout Width]')
    this.scaleFactor = containerWidth / seatLayoutWidth;

    this.cardScaleFactor = containerClientWidth / seatLayoutWidth;
    // console.log(this.scaleFactor)

    if (this.cardScaleFactor === 0) {
      this.cardScaleFactor = 1;
      // console.log('cardScaleFactor is 1')
    } else if (this.cardScaleFactor >= 1) {
      this.cardScaleFactor = 1;
      // console.log('cardScaleFactor is 1')
    }

    if (this.cardScaleFactor < 0.8) {
      this.cardScaleFactor = 0.9;
    }

    // console.log(containerClientWidth, ' => [Container Client Width]')

    // center horizontally and vertically
    const seatsCenterX = minX + seatLayoutWidth / 2;
    const seatsCenterY = minY + seatLayoutHeight / 2;

    // console.log('Log Scale factor')
    // console.log(this.scaleFactor)

    this.centerOffsetX = containerWidth / 2 - seatsCenterX * this.scaleFactor;
    // keep vertical scale at 1, so offset uses original seat positions
    this.centerOffsetY = containerHeight / 2 - seatsCenterY;

    // console.log('Offsets:', this.centerOffsetX, this.centerOffsetY, 'Scale:', this.scaleFactor);
  }

  adjustSeatPosition(seat: SeatData, property: 'left' | 'top'): number {
    const value = parseInt(seat[property]);
    if (property === 'left') {
      if (this.isMobileView) {
        return value + this.centerOffsetX;
      }
      return value * this.scaleFactor + this.centerOffsetX;
    } else {
      // vertical stays unchanged except for centering
      return value + this.centerOffsetY;
    }
  }

  protected readonly parseInt = parseInt;

  private timerInterval: any;
  timeRemainingFormatted = '';

  // bookingService = inject(BookingService)
  getTimer() {
    // console.log('[Timer method]');
    const date: string | null = this.bookingService.getConfig('travel_date');
    const returnDate: string | null = this.bookingService.getConfig('return_date');

    // console.log('Travel Date:', date, 'Return Date:', returnDate);

    // console.log(this.busData)

    const departureTimeRaw = this.busData?.departure_time;
    // console.log('Departure time raw', departureTimeRaw)
    // console.log('Departure Time:', departureTimeRaw);
    const departureTime =
      departureTimeRaw && departureTimeRaw.includes(':') ? departureTimeRaw : '00:00'; // fallback if invalid or missing

    const tripType = this.bookingService.getConfig('trip_type');
    const selectedTab = this.bookingService.getConfig('selectedTab');

    if (!date && !returnDate) {
      this.timeRemainingFormatted = 'Invalid Date';
      return;
    }

    // Helper to combine date and time safely
    const combineDateTime = (dateStr: string | null, timeStr: string) => {
      if (!dateStr) return null;
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return null; // invalid date check

      const [hours, minutes] = timeStr.split(':').map((num) => parseInt(num, 10) || 0);
      dateObj.setHours(hours, minutes, 0, 0);
      return dateObj;
    };

    let targetDate: Date | null = null;

    if (tripType === 'onward') {
      // console.log(date, departureTime)
      targetDate = combineDateTime(date, departureTime);
      // console.log('Onward ')
    } else if (tripType === 'twoway' && selectedTab === 'onward') {
      targetDate = combineDateTime(date, departureTime);
      // console.log('twoway onward ')
    } else if (tripType === 'twoway' && selectedTab === 'twoway') {
      targetDate = combineDateTime(returnDate, departureTime);
      // console.log('twoway twoway ')
    }

    // console.log('Target Date:', targetDate);

    if (!targetDate) {
      this.timeRemainingFormatted = 'Invalid Date';
      return;
    }

    const now = new Date();
    let diffMs = targetDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      this.timeRemainingFormatted = '00d 00h 00m 00s';
      return;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffMs %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs %= 1000 * 60 * 60;

    const minutes = Math.floor(diffMs / (1000 * 60));
    diffMs %= 1000 * 60;

    const seconds = Math.floor(diffMs / 1000);

    this.timeRemainingFormatted =
      `${days.toString().padStart(2, '0')}d ` + `${hours}h ${minutes}m ${seconds}s`;
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    this.getTimer(); // run immediately once
    this.timerInterval = setInterval(() => {
      this.getTimer(); // run every second or minute
    }, 60000); // change to 60000 if you only need minute updates
  }

  resultComponent = inject(ResultsComponent);

  closeIsOpenView() {
    // console.log('[cLOSED]')
    this.resultComponent.closeView();
  }

  proceedToReschedule() {
    //   TODO: Do all Pnecessary rescheduling login here
  }
}
