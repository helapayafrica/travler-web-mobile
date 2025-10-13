import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BackendService} from '../../../services/backend';
import {TranslatePipe} from '@ngx-translate/core';


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
  imports: [CommonModule, FormsModule, TranslatePipe]
})
export class DashboardComponent implements OnInit {
  totalItems: number = 10;
  dateRange: Date = new Date();
  currency: string = 'KES';
  searchQuery: string = '';
  user: string = '';
  bookings: Booking[] = [];
  currencies: any[] = [];
  perPage = 10
  // currencyId = 1
  // start_date: Date;
  // end_date: Date;


  constructor(public service:BackendService) {
  }

  ngOnInit(): void {
    // You would fetch data from a service in a real app
    // For now, leaving it empty to match the screenshot
    this.getCurrencies()
    this.getCommissionReport()
  }

  search(): void {
    // Implement search functionality
    // console.log('Searching for:', this.searchQuery);
  }


  // Agent
  backendService = inject(BackendService)

  getCommissionReport() {

    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const request = {
      agentId: null,
      currencyId: this.currency,
      endDate: today,
      page: 1,
      perPage: this.perPage,
      startDate: today,
      sourcetype: "web",
    }
    this.backendService.getCommissionReport(request).subscribe({
      next:(response)=>{
        console.log(response);
        if (response.isSuccess){
          this.bookings = response.data
        }else{
          this.bookings = []
        }
      },
      error:(error)=>{
        console.error(error)
      },
      complete:()=>{
        console.log("complete")
      }
    })
  }

  getCurrencies(){
    this.backendService.getCurrencyList().subscribe({
      next:(response) => {
        if(response.isSuccess){
          this.currencies = response.currency;
          console.log(this.currencies);
        }
      },
      error:(error)=>{
        console.log(error)
      },
      complete: ()=>{}
    })
  }
}
