import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {PaymentConfirmation, PaymentSocketService} from '../../payment-socket-service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
// import { PaymentSocketService, PaymentConfirmation } from '../../services/payment-socket.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation-component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./payment-confirmation-component.scss']
})
export class PaymentConfirmationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  isConnected = false;
  currentRoom: string | null = null;
  paymentConfirmation: PaymentConfirmation | null = null;
  roomTimeout: any = null;
  roomClosed: any = null;

  invoiceRef = '';
  isLoading = false;

  constructor(private paymentSocketService: PaymentSocketService) {}

  ngOnInit(): void {
    this.subscribeToSocketEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private subscribeToSocketEvents(): void {
    // Connection status
    this.subscriptions.push(
      this.paymentSocketService.isConnected$.subscribe(connected => {
        this.isConnected = connected;
      })
    );

    // Current room
    this.subscriptions.push(
      this.paymentSocketService.currentRoom$.subscribe(room => {
        this.currentRoom = room;
      })
    );

    // Payment confirmation
    this.subscriptions.push(
      this.paymentSocketService.paymentConfirmation$.subscribe(confirmation => {
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
      this.paymentSocketService.roomTimeout$.subscribe(timeout => {
        if (timeout) {
          this.roomTimeout = timeout;
          this.isLoading = false;
        }
      })
    );

    // Room closed
    this.subscriptions.push(
      this.paymentSocketService.roomClosed$.subscribe(closed => {
        if (closed) {
          this.roomClosed = closed;
          this.isLoading = false;
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

      this.paymentSocketService.joinPaymentRoom(this.invoiceRef.trim());
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

    // You can emit events, show notifications, navigate to success page, etc.
    // Example: this.router.navigate(['/payment-success']);
  }
}
