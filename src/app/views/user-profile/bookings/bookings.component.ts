import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BackendService} from '../../../services/backend';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';

interface Booking {
  companyName: string;
  ticketNo: string;
  passenger: string;
  date: string;
  route: string;
  fare: string;
  paid: string;
  commission: string;
  bookedBy: string;
  action: string;
}

@Component({
  selector: 'app-view-user-profile-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, Button, Dialog],
})
export class BookingsComponent implements OnInit {
  totalItems: number = 10;
  dateRange: string = '11 Mar 2025 - 11 Mar 2025';
  status: string = 'confirmed';
  currency: string = 'KES';
  searchQuery: string = '';
  user: string = '';
  state: 'upcoming' | 'completed' = 'upcoming';
  activeTab = 'upcoming';

  bookings: Booking[] = [];
  data: any[] = [];

  service = inject(BackendService);
  visible: boolean = false
  selectedBooking: any = {}

  constructor() {
  }

  ngOnInit(): void {
    // You would fetch data from a service in a real app
    // For now, leaving it empty to match the screenshot
    this.getTripData(this.state);
  }

  search(): void {
    // Implement search functionality
    // console.log('Searching for:', this.searchQuery);
  }

  getTripData(state: 'upcoming' | 'completed') {
    this.activeTab = state;
    this.service.getBookingHistory(state).subscribe({
      next: (value: any) => {
        if (value.data) {
          this.data = value.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Successfully retrieved data');
      },
    });
  }

  rescheduleBooking(booking: any) {
    // Your reschedule logic here
    console.log('Reschedule booking:', booking);
  }

  showDialog(booking: any) {
    console.log(booking)
    this.selectedBooking = booking
    this.visible = true;
  }
}
