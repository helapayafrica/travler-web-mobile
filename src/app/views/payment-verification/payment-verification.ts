import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PaymentConfirmation } from '../../Models';
import { PaymentSocketService } from '../../services/payment-socket-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-payment-verification',
  imports: [NgSwitch, NgSwitchCase],
  templateUrl: './payment-verification.html',
  styleUrl: './payment-verification.scss',
})
export class PaymentVerification implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  toastr = inject(ToastrService);

  isConnected = false;
  currentRoom: string | null = null;
  paymentConfirmation: PaymentConfirmation | null = null;
  roomTimeout: any = null;
  roomClosed: any = null;

  invoiceRef = '';
  isLoading = false;
  // private route = inject(ActivatedRoute)
  private router = inject(Router);
  private bookingService = inject(BookingService);

  constructor(private paymentSocketService: PaymentSocketService) {}

  ngOnInit(): void {
    this.subscribeToSocketEvents();

    const bookingRef = this.bookingService.getConfig('booking_reference');

    if (bookingRef) {
      this.invoiceRef = bookingRef as string;
      this.autoJoinRoom();
    }

  }

  private subscribeToSocketEvents(): void {
    // Connection status
    this.subscriptions.push(
      this.paymentSocketService.isConnected$.subscribe((connected: any) => {
        this.isConnected = connected;
        // ADD these lines:
        if (!connected && this.currentRoom) {
          this.toastr.warning('Connection lost. Attempting to reconnect...', 'Connection');
        }
        if (connected && this.currentRoom && !this.paymentConfirmation) {
          this.toastr.info('Connection restored. Monitoring payment...', 'Reconnected');
        }
      })
    );

    // Current room
    this.subscriptions.push(
      this.paymentSocketService.currentRoom$.subscribe((room: any) => {
        this.currentRoom = room;
        // ADD this line:
        if (this.invoiceRef && this.isLoading && !room) {
          this.handleRoomJoinFailure();
        }
      })
    );

    // Payment confirmation
    this.subscriptions.push(
      this.paymentSocketService.paymentConfirmation$.subscribe((confirmation: any) => {
        if (confirmation) {
          this.paymentConfirmation = confirmation;
          this.isLoading = false;
          // Handle successful payment
          this.handlePaymentSuccess(confirmation);
        }
      })
    );

    // Room timeout
    this.subscriptions.push(
      this.paymentSocketService.roomTimeout$.subscribe((timeout: any) => {
        if (timeout) {
          this.roomTimeout = timeout;
          this.isLoading = false;
          this.handlePaymentTimeout();
        }
      })
    );

    // Room closed
    this.subscriptions.push(
      this.paymentSocketService.roomClosed$.subscribe((closed: any) => {
        if (closed) {
          this.roomClosed = closed;
          this.isLoading = false;
          this.handleRoomClosed(closed);
        }
      })
    );
  }

  joinRoom(): void {
    if (this.invoiceRef.trim() && this.isConnected) {
      this.isLoading = true;
      this.paymentConfirmation = null;
      this.roomTimeout = null;
      this.roomClosed = null;

      // this.paymentSocketService.joinPaymentRoom(this.invoiceRef.trim());
      try {
        this.paymentSocketService.joinPaymentRoom(this.invoiceRef.trim());

        // ADD timeout detection:
        setTimeout(() => {
          if (this.isLoading && !this.currentRoom) {
            this.handleRoomJoinFailure();
          }
        }, 5000);
      } catch (error) {
        this.isLoading = false;
        this.toastr.error('Failed to join payment room. Please try again.', 'Error');
      }
    } else if (!this.isConnected) {
      this.toastr.error(
        'Not connected to server. Please check your connection.',
        'Connection Error'
      );
    }
  }

  leaveRoom(): void {
    if (this.invoiceRef.trim() && this.isConnected) {
      this.paymentSocketService.leavePaymentRoom(this.invoiceRef.trim());
      this.isLoading = false;
    }
  }

  ping(): void {
    this.paymentSocketService.ping();
  }

  private handlePaymentSuccess(confirmation: PaymentConfirmation): void {
    // Handle successful payment
    console.log('Payment confirmed:', confirmation);
    this.toastr.success('Payment confirmed successfully!', 'Success');

    setTimeout(() => {
      this.router.navigate(['/spin-to-win']);
    }, 3000);
  }

  // Auto Join room
  private autoJoinRoom(): void {
    if (this.isConnected) {
      this.joinRoom();
    } else {
      const connectionSub = this.paymentSocketService.isConnected$.subscribe(
        (connected: boolean) => {
          if (connected && this.invoiceRef.trim()) {
            connectionSub.unsubscribe();
          }
        }
      );
    }
  }

  status(): string {
    if (this.paymentConfirmation) {
      return 'success';
    } else if (this.roomTimeout || this.roomClosed) {
      return 'failed';
    } else if (this.isLoading || this.currentRoom) {
      return 'processing';
    }
    return 'idle';
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  retry(): void {
    if (!this.isConnected) {
      this.toastr.error(
        'Cannot retry while disconnected. Please check your connection.',
        'Connection Error'
      );
      return;
    }

    if (this.invoiceRef.trim()) {
      this.roomTimeout = null;
      this.roomClosed = null;
      this.paymentConfirmation = null;

      this.joinRoom();
    }
  }

  goBack(): void {
    this.leaveRoom();
    this.invoiceRef = '';
    this.paymentConfirmation = null;
    this.roomTimeout = null;
    this.roomClosed = null;
  }

  private handleRoomJoinFailure(): void {
    this.isLoading = false;
    this.toastr.error('Failed to join payment room. Please check your invoice reference.', 'Error');
    this.currentRoom = null;
  }

  tryAgain = false;
  private handlePaymentTimeout(): void {
    this.toastr.warning(
      'Payment confirmation timed out. Please check your payment status.',
      'Timeout'
    );
    this.tryAgain = true;
  }

  private handleRoomClosed(closedInfo: any): void {
    if (closedInfo.reason === 'error') {
      this.toastr.error('Payment monitoring stopped due to an error.', 'Error');
    } else if (closedInfo.reason === 'timeout') {
      this.toastr.warning('Payment monitoring timed out.', 'Timeout');
    }
  }




  ngOnDestroy(): void {
    // Leave room before destroying component
    if (this.currentRoom) {
      this.leaveRoom();
    }

    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());

    this.paymentSocketService.disconnect();
  }
}
