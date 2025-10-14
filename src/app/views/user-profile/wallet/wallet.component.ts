import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingService} from '../../../services/booking';
import {BackendService} from '../../../services/backend';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

interface WalletTransaction {
 key: number;
  name: string;
 data : { amount: string;
   amountStatus: string;
   comments: string;}[]
}

@Component({
  selector: 'app-view-user-profile-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe]
})
export class WalletComponent implements OnInit {
  walletBalance: string = '0';
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
    const userData:any = this.service.getConfig('userData');
    const userId = userData.userId
    console.log(userId)

    this.backendService.getUserWalletData(userId).subscribe({
      next: (res: any) => {
        // console.log(r)
        this.walletBalance = res.data[0].amount;
      }
    })
  }


  getWalletHistory(){
    const userData:any = this.service.getConfig('userData');
    const userId = userData.userId

    this.backendService.getWalletHistoryData(userId).subscribe({
      next: (data: any) => {
        this.transactions = data.data;
        // console.log(data.data)

      },
      error: (error: any) => {
        console.error('Error fetching wallet history:', error);
      }
    })
  }
}
