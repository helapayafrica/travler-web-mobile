import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingService} from '../../../services/booking';
import {BackendService} from '../../../services/backend';

interface WalletTransaction {
  amount: string;
  status: string;
  comment: string;
}

@Component({
  selector: 'app-view-user-profile-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class WalletComponent implements OnInit {
  walletBalance: string = 'KES 0.00';
  service = inject(BookingService)
  backendService = inject(BackendService)
  transactions: WalletTransaction[] = [];

  constructor() { }

  ngOnInit(): void {
    // You would fetch wallet data from a service in a real app
  }

  transferMoney(): void {
    // Implement money transfer functionality
    // console.log('Transfer money clicked');
  }

  getWalletdate(){
    const userDate:any = this.service.getConfig('userDate');
    const userId = userDate.userId

    this.backendService.getUserWalletData(userId).subscribe({
      next: (data: any) => {
        this.walletBalance = data.amount;
      }
    })
  }
}
