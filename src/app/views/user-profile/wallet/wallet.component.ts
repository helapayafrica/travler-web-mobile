import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  transactions: WalletTransaction[] = [];

  constructor() { }

  ngOnInit(): void {
    // You would fetch wallet data from a service in a real app
  }

  transferMoney(): void {
    // Implement money transfer functionality
    // console.log('Transfer money clicked');
  }
}
