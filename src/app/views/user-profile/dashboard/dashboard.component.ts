import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BackendService} from '../../../services/backend';


interface Booking {
  companyName: string;
  ticketNo: string;
  totalSales: string;
  commission: string;
  selfCommission: string;
  walletBalance: string;
}

@Component({
  selector: 'app-view-user-profile-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  totalItems: number = 10;
  dateRange: Date = new Date();
  currency: string = 'KES';
  searchQuery: string = '';
  user: string = '';
  bookings: Booking[] = [];

  constructor(public service:BackendService) {
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
