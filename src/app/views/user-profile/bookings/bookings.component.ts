import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

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
  imports: [CommonModule, FormsModule]
})
export class BookingsComponent implements OnInit {
  totalItems: number = 10;
  dateRange: string = '11 Mar 2025 - 11 Mar 2025';
  status: string = 'confirmed';
  currency: string = 'KES';
  searchQuery: string = '';
  user: string = ''

  bookings: Booking[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // You would fetch data from a service in a real app
    // For now, leaving it empty to match the screenshot
  }

  search(): void {
    // Implement search functionality
    // console.log('Searching for:', this.searchQuery);
  }
}
