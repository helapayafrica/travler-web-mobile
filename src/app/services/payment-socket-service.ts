import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PaymentConfirmation {
  type: string;
  invoice_ref: string;
  timestamp: string;
  data: {
    TransactionType: string;
    TransID: string;
    TransTime: string;
    TransAmount: string;
    BusinessShortCode: string;
    BillRefNumber: string;
    InvoiceNumber: string;
    OrgAccountBalance: string;
    ThirdPartyTransID: string;
    MSISDN: string;
    FirstName: string;
  };
}

export interface RoomStatus {
  room: string;
  invoice_ref: string;
  message: string;
  timeout: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentSocketService {
  private socket!: Socket;
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private currentRoom = new BehaviorSubject<string | null>(null);
  private paymentConfirmation = new BehaviorSubject<PaymentConfirmation | null>(null);
  private roomTimeout = new BehaviorSubject<any>(null);
  private roomClosed = new BehaviorSubject<any>(null);

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket(): void {
    // Replace with your server URL
    this.socket = io('http://18.191.130.168:6535', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      this.connectionStatus.next(true);
    });

    this.socket.on('disconnect', () => {
      this.connectionStatus.next(false);
      this.currentRoom.next(null);
    });

    this.socket.on('joined_room', (data: RoomStatus) => {
      this.currentRoom.next(data.room);
    });

    this.socket.on('left_room', (data: RoomStatus) => {
      this.currentRoom.next(null);
    });

    this.socket.on('payment_confirmation', (data: PaymentConfirmation) => {
      this.paymentConfirmation.next(data);
    });

    this.socket.on('room_timeout', (data: any) => {
      this.roomTimeout.next(data);
    });

    this.socket.on('room_closed', (data: any) => {
      this.roomClosed.next(data);
      this.currentRoom.next(null);
    });

    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  // Observable getters
  get isConnected$(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  get currentRoom$(): Observable<string | null> {
    return this.currentRoom.asObservable();
  }

  get paymentConfirmation$(): Observable<PaymentConfirmation | null> {
    return this.paymentConfirmation.asObservable();
  }

  get roomTimeout$(): Observable<any> {
    return this.roomTimeout.asObservable();
  }

  get roomClosed$(): Observable<any> {
    return this.roomClosed.asObservable();
  }

  // Methods
  joinPaymentRoom(invoiceRef: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('join_payment_room', { invoice_ref: invoiceRef });
    }
  }

  leavePaymentRoom(invoiceRef: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('leave_payment_room', { invoice_ref: invoiceRef });
    }
  }

  ping(): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('ping');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  get isConnected(): boolean {
    return this.socket ? this.socket.connected : false;
  }
}
