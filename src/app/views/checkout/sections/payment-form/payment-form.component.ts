import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BusInfoComponent} from '../bus-info/bus-info.component';
import {ToastrService} from 'ngx-toastr';
import {BookingService} from '../../../../services/booking';
import {BackendService} from '../../../../services/backend';
import {Button} from 'primeng/button';
import {Drawer} from 'primeng/drawer';
import {Router} from '@angular/router';
import {filter, Observable, of, skip, switchMap, take, tap, pipe, merge} from 'rxjs';
import Swal from 'sweetalert2';
import {catchError, first, map} from 'rxjs/operators';
import {PaymentSocketService} from '../../../../services/payment-socket-service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BusInfoComponent, Button, Drawer, TranslatePipe,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  promotionForm !: FormGroup;
  interval: any;
  isTimeExpired: boolean = false;
  selectedPaymentMethod: string = 'mpesa'; // Default selection
  timeLeft: number = 600; // Time remaining
  totalDuration: number = 600; // ✅ Set the total duration of the timer

  countryCodes = [
    {code: '254', country: 'Kenya'},
    {code: '255', country: 'Tanzania'},
    {code: '256', country: 'Uganda'},
    {code: '250', country: 'Rwanda'}
  ];

  router = inject(Router)
  paymentSocketService = inject(PaymentSocketService)


  constructor(private fb: FormBuilder, public bookingService: BookingService, public service: BackendService, private toastr: ToastrService) {

    this.bookingService.referenceNumber$.subscribe((res) => {


    })
  }

  ngOnInit() {
    // Initialize Form
    this.paymentForm = this.fb.group({
      paymentMethod: ['mpesa', Validators.required], // Default to Mpesa
      mobileNumber: ['', [Validators.required]],
      consent: [true, [Validators.requiredTrue]],
      countryCode: ['', Validators.required]
    });

    this.promotionForm = this.fb.group({
      code: ['', Validators.required], // Default to Mpesa
    });
    this.getTicket();
    // Start the countdown timer
    this.restoreTimer();

  }

  async getTicket() {
    {
      let payload: any = await this.bookingService.getConfig('ticket');

      this.paymentForm.patchValue({
        countryCode: payload.ticketDetail.onwardticket.passenger[0]['mobileId'],
        mobileNumber: payload.ticketDetail.onwardticket.passenger[0]['mobile']
      })
    }
  }

  // Function to update the mobile number placeholder and pattern
  updatePlaceholder() {
    this.selectedPaymentMethod = this.paymentForm.value.paymentMethod;
    let mobileControl = this.paymentForm.get('mobileNumber');

    if (this.selectedPaymentMethod === 'mpesa') {
      mobileControl?.setValidators([Validators.required, Validators.pattern(/^7\d{8}$/)]);
      mobileControl?.updateValueAndValidity();
    } else {
      mobileControl?.setValidators([Validators.required, Validators.pattern(/^7\d{8}$/)]);
      mobileControl?.updateValueAndValidity();
    }
  }

  // Start a countdown timer for 10 minutes
  startTimer() {
    console.log(" Timer Started")
    if (this.interval) {
      clearInterval(this.interval); // ✅ Prevent multiple intervals
    }
    this.isTimeExpired = false;
    localStorage.setItem('timerStart', Date.now().toString()); // ✅ Store start time

    this.interval = setInterval(() => {
      const startTime = Number(localStorage.getItem('timerStart'));
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      this.timeLeft = Math.max(0, this.totalDuration - elapsedSeconds);
      localStorage.setItem('timeLeft', this.timeLeft.toString()); // ✅ Save updated time
      if (this.timeLeft === 0) {
        clearInterval(this.interval);
        this.isTimeExpired = true;
        localStorage.removeItem('timeLeft'); // ✅ Remove stored timer
        localStorage.removeItem('timerStart');
        this.onTimeExpired();
      }
    }, 1000);
  }


  onTimeExpired() {
    console.log("Time has expired!");
    // Handle timeout (disable buttons, show alert, etc.)
  }

  restoreTimer() {
    const savedTime = localStorage.getItem('timeLeft');
    if (savedTime) {
      this.timeLeft = Number(savedTime);
      if (this.timeLeft > 0) {
        this.startTimer();
      }
    }
  }

  // Function to format the timer display
  get formattedTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Submit Payment Function
  busInfoVisible: boolean = true;

  submitPayment() {
    // console.log(this.paymentForm.valid);
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched(); // Show errors
      return;
    }

    if (this.isTimeExpired) {
      alert('Time expired! Please refresh and try again.');
      return;
    }

    // Proceed with payment logic here
    console.log('Payment Submitted:', this.paymentForm.value);
    this.makePayment();
  }

  updateValidation() {
    const countryCode = this.paymentForm.get('countryCode')?.value;
    const mobileControl = this.paymentForm.get('mobileNumber');

    if (countryCode) {
      // If a country code is selected, allow any number
      mobileControl?.setValidators([Validators.required]);
    } else {
      // If no country code, enforce Kenyan format
      mobileControl?.setValidators([Validators.required, Validators.pattern(/^07\d{8}$/)]);
    }

    mobileControl?.updateValueAndValidity();

  }

  async makePayment() {
    let formData = this.paymentForm.value
    console.log(formData)
    let ref_no = await this.bookingService.getConfig('booking_reference')
    let data = {
      "bookingRef": ref_no,
      "queryoption": 2,
      "queryvalue": formData.countryCode + formData.mobileNumber,
      "requestType": "ticket",
      "additionalInfo": {
        "onward": {"sponsorTrip": false, "discountId": 0},
        "return": {"sponsorTrip": false, "discountId": 0}
      },
      "isWalletApply": false,
      "sourcetype": "web"
    }

    this.checkWallet().subscribe(isValid => {
      const newData = {
        ...data,
        isWalletApply: isValid
      }

      // console.log(data)
      console.log("Booking Ref")
      console.log(newData.bookingRef)
      this.service.makePayment(newData).subscribe((res) => {

        // console.log("['Payment Response']", res);
        //
        // console.log(res);
        // join the socketroom for payment  confirmation
        // this.bookingService.setConfig("roomIdRef","payment_"+res.bookingRef )
        console.log("payment_" + newData.bookingRef)

        // this.paymentSocketService.isConnected$
        //   .pipe(
        //     filter(connected => connected),
        //     tap(() => {
        //       console.log("Joinning room")
        //       this.paymentSocketService.joinPaymentRoom("payment_" + newData.bookingRef);
        //     }),
        //     switchMap(() => {
        //       console.log('[Payment Formation socket]')
        //        return this.paymentSocketService.paymentConfirmation$
        //     })
        //   )
        //   .subscribe({
        //     next: (confirmation) => {
        //       console.log('[Confirmation]', confirmation);
        //       if (confirmation) {
        //         console.log("Conformation Recieved")
        //         // this.handlePaymentSuccess(confirmation);
        //       }
        //     },
        //     error: (err) => console.error(err)
        //   });
        // "payment_" +
       const invoiceRef = "payment_" +newData.bookingRef
this.paymentSocketService.isConnected$
  .pipe(
    filter(connected => connected),
    take(1),
    tap(() => {
      console.log("Joining room");
      this.paymentSocketService.joinPaymentRoom(invoiceRef);
      
      // Show waiting message
      Swal.fire({
        title: 'Waiting for Payment',
        text: 'Please complete the M-Pesa payment on your phone',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }),
    switchMap(() => 
      merge(
        this.paymentSocketService.paymentConfirmation$.pipe(
          filter(conf => conf !== null),
          map(conf => ({ type: 'payment', data: conf }))
        ),
        this.paymentSocketService.roomTimeout$.pipe(
          filter(timeout => timeout !== null),
          map(timeout => ({ type: 'timeout', data: timeout }))
        )
      ).pipe(first())
    )
  )
  .subscribe({
    next: (result) => {
      Swal.close(); // Close loading dialog
      
      if (result.type === 'payment') {
        console.log('Payment confirmed:', result.data);
        
        Swal.fire({
          title: 'Payment Successful!',
          text: `Payment of KES ${result.data.data.TransAmount} received`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // Handle success
        
      } else if (result.type === 'timeout') {
        console.log('Payment timeout:', result.data);
        
        Swal.fire({
          title: 'Payment Timeout',
          text: 'Payment window has expired. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        // Handle timeout
      }
      
      this.paymentSocketService.leavePaymentRoom(invoiceRef);
    },
    error: (err) => {
      Swal.close();
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });



        // console.log(res)
        this.startTimer()
        if (res.isSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Payment Initiated',
            text: res.msg,
            timer: 3000, // Auto-close after 3 seconds
            showConfirmButton: false
          });
          setTimeout(() => {
            // this.router.navigate(['/confirm-payment'])
          }, 3000)

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: res.msg,
            timer: 5000, // Auto-close after 3 seconds
            cancelButtonText: 'Cancel',
            showCancelButton: true,
          });
        }
      });

    })

  }


  checkWallet(): Observable<boolean> {
    const userData: any = this.bookingService.getConfig('userData');
    if (!userData) return of(false);
    if (!userData.userId) return of(false);

    return this.service.getUserWalletData(userData.userId).pipe(
      map((wallet: any) => wallet.data.amount >= 1),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }


}
