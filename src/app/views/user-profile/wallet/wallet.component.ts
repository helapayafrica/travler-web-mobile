import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingService} from '../../../services/booking';
import {BackendService} from '../../../services/backend';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

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
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe]
})
export class WalletComponent implements OnInit {
  walletBalance: string = 'KES 0.00';
  service = inject(BookingService)
  backendService = inject(BackendService)
  transactions: WalletTransaction[] = [];
  voucherForm = new FormGroup(({
    voucher: new FormControl('')
  }))


  constructor() { }

  ngOnInit(): void {
    // You would fetch wallet data from a service in a real app
    this.getWalletData()
    this.getWalletHistory()
  }

  transferMoney(): void {
    // Implement money transfer functionality
    // console.log('Transfer money clicked');
  }
  applyVoucher(){
    console.log(this.voucherForm.value.voucher)
  //   TODO: Appy Voucher card. back end

    this.getWalletData()
  }

  getWalletData(){
    const userDate:any = this.service.getConfig('userDate');
    const userId = userDate.userId

    this.backendService.getUserWalletData(userId).subscribe({
      next: (data: any) => {
        this.walletBalance = data.amount;
      }
    })
  }


  getWalletHistory(){
    const userDate:any = this.service.getConfig('userDate');
    const userId = userDate.userId

    this.backendService.getWalletHistoryData(userId).subscribe({
      next: (data: any) => {
        this.transactions = data;
      },
      error: (error: any) => {
        console.error('Error fetching wallet history:', error);
      }
    })
  }
}
