import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaymentConfirmation } from '../../Models';
import { PaymentSocketService } from '../../services/payment-socket-service';
import { Router } from '@angular/router';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { BookingService } from '../../services/booking';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

@Component({
  selector: 'app-payment-verification',
  imports: [NgSwitch, NgSwitchCase],
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

  constructor(private paymentSocketService: PaymentSocketService) {}

  ngOnInit(): void {
    // this.paymentSocketService.connect();
    this.subscribeToSocketEvents();
    this.initializeInvoiceRef();
  }

  private initializeInvoiceRef(): void {
    const roomIdRef = this.bookingService.getConfig('roomIdRef');
    if (roomIdRef) {
      this.invoiceRef = roomIdRef as string;
      this.autoJoinRoom();
    }
  }

  private subscribeToSocketEvents(): void {
    this.subscriptions.add(
      this.paymentSocketService.isConnected$.subscribe((connected) => {
        this.isConnected = connected;
        this.handleConnectionChange(connected);
      })
    );

    this.subscriptions.add(
      this.paymentSocketService.currentRoom$.subscribe((room) => {
        this.currentRoom = room;
        if (this.invoiceRef && this.isLoading && !room) {
          this.handleRoomJoinFailure();
        }
      })
    );

    this.subscriptions.add(
      this.paymentSocketService.paymentConfirmation$.subscribe((confirmation) => {
        if (confirmation) {
          this.paymentConfirmation = confirmation;
          this.isLoading = false;
          this.handlePaymentSuccess(confirmation);
        }
      })
    );

    this.subscriptions.add(
      this.paymentSocketService.roomTimeout$.subscribe((timeout) => {
        if (timeout) {
          this.roomTimeout = true;
          this.isLoading = false;
          this.handlePaymentTimeout();
        }
      })
    );

    this.subscriptions.add(
      this.paymentSocketService.roomClosed$.subscribe((closed) => {
        if (closed) {
          this.roomClosed = true;
          this.isLoading = false;
          this.handleRoomClosed(closed);
        }
      })
    );
  }

  private handleConnectionChange(connected: boolean): void {
    if (!connected && this.currentRoom) {
      this.toastr.warning('Connection lost. Attempting to reconnect...', 'Connection');
    } else if (connected && this.currentRoom && !this.paymentConfirmation) {
      this.toastr.info('Connection restored. Monitoring payment...', 'Reconnected');
    }
  }

  joinRoom(): void {
    if (!this.invoiceRef.trim()) return;

    if (!this.isConnected) {
      this.toastr.error('Not connected to server. Please check your connection.', 'Connection Error');
      return;
    }

    this.resetState();
    this.isLoading = true;

    this.paymentSocketService.joinPaymentRoom(this.invoiceRef.trim());

    setTimeout(() => {
      if (this.isLoading && !this.currentRoom) {
        this.handleRoomJoinFailure();
      }
    }, this.JOIN_TIMEOUT);
  }

  leaveRoom(): void {
    if (this.currentRoom && this.isConnected) {
      this.paymentSocketService.leavePaymentRoom(this.invoiceRef.trim());
      this.isLoading = false;
    }
  }

  private autoJoinRoom(): void {
    if (this.isConnected) {
      this.joinRoom();
    } else {
      this.subscriptions.add(
        this.paymentSocketService.isConnected$.subscribe((connected) => {
          if (connected && this.invoiceRef.trim()) {
            this.joinRoom();
          }
        })
      );
    }
  }

  private handlePaymentSuccess(confirmation: PaymentConfirmation): void {
    console.log('Payment confirmed:', confirmation);
    this.toastr.success('Payment confirmed successfully!', 'Success');

    setTimeout(() => {
      this.router.navigate(['/spin-to-win']);
    }, this.REDIRECT_DELAY);
  }

  private handlePaymentTimeout(): void {
    this.toastr.warning('Payment confirmation timed out. Please check your payment status.', 'Timeout');
  }

  private handleRoomClosed(closedInfo: any): void {
    const message = closedInfo.reason === 'error'
      ? 'Payment monitoring stopped due to an error.'
      : 'Payment monitoring timed out.';

    const title = closedInfo.reason === 'error' ? 'Error' : 'Timeout';
    this.toastr[closedInfo.reason === 'error' ? 'error' : 'warning'](message, title);
  }

  private handleRoomJoinFailure(): void {
    this.isLoading = false;
    this.toastr.error('Failed to join payment room. Please check your invoice reference.', 'Error');
  }

  retry(): void {
    if (!this.isConnected) {
      this.toastr.error('Cannot retry while disconnected. Please check your connection.', 'Connection Error');
      return;
    }

    if (this.currentRoom) {
      this.leaveRoom();
    }

    this.joinRoom();
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
