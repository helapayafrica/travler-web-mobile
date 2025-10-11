import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription, switchMap, tap} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaymentConfirmation } from '../../Models';
import { PaymentSocketService } from '../../services/payment-socket-service';
import { Router } from '@angular/router';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { BookingService } from '../../services/booking';
import {TranslatePipe} from '@ngx-translate/core';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

@Component({
  selector: 'app-payment-verification',
  imports: [NgSwitch, NgSwitchCase, TranslatePipe],
  templateUrl: './payment-verification.html',
  styleUrl: './payment-verification.scss',
})
export class PaymentVerification implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);
  private readonly JOIN_TIMEOUT = 5000;
  private readonly REDIRECT_DELAY = 3000;

  isConnected = false;
  currentRoom: string | null = null;
  paymentConfirmation: PaymentConfirmation | null = null;
  roomTimeout = false;
  roomClosed = false;
  invoiceRef = '';
  isLoading = false;

  // status = signal('idle')

  constructor(private paymentSocketService: PaymentSocketService) {}

  ngOnInit(): void {
     // setTimeout(()=>{
     //   console.log("Payment Verification Initialized");
     //   this.paymentSocketService.isConnected$
     //     .pipe(
     //       tap(res => console.log('[Connected]', res)),
     //       switchMap(() => this.paymentSocketService.paymentConfirmation$))
     //     .subscribe({
     //       next: (confirmation) => {
     //         console.log('[Confirmation]', confirmation);
     //         if (confirmation) {
     //           this.paymentConfirmation = confirmation;
     //           this.isLoading = false;
     //           this.handlePaymentSuccess(confirmation);
     //         }
     //       },
     //       error: (err) => console.error(err),
     //       complete: () => console.log('[Connection complete]')
     //     });
     //
     // }, 10000)

  }










  leaveRoom(): void {
    if (this.currentRoom && this.isConnected) {
      this.paymentSocketService.leavePaymentRoom(this.invoiceRef.trim());
      this.isLoading = false;
    }
  }


  private handlePaymentSuccess(confirmation: PaymentConfirmation): void {
    console.log('Payment confirmed:', confirmation);
    this.toastr.success('Payment confirmed successfully!', 'Success');

    setTimeout(() => {
      this.router.navigate(['/spin-to-win']);
    }, this.REDIRECT_DELAY);
  }



  retry(): void {
    if (!this.isConnected) {
      this.toastr.error('Cannot retry while disconnected. Please check your connection.', 'Connection Error');
      return;
    }

    if (this.currentRoom) {
      this.leaveRoom();
    }
  }

  goBack(): void {
    this.leaveRoom();
    this.resetState();
    this.invoiceRef = '';
  }

  private resetState(): void {
    this.paymentConfirmation = null;
    this.roomTimeout = false;
    this.roomClosed = false;
  }

  status(): PaymentStatus {
    if (this.paymentConfirmation?.data.TransID) return 'success';
    if (this.roomTimeout || this.roomClosed) return 'failed';
    if (this.isLoading || this.currentRoom) return 'processing';
    return 'idle';
  }

  ngOnDestroy(): void {
    if (this.currentRoom) {
      this.leaveRoom();
    }
    this.subscriptions.unsubscribe();
    this.paymentSocketService.disconnect();
  }
}
