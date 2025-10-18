import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { NgOtpInputComponent } from 'ng-otp-input';
import Swal from 'sweetalert2';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import {BackendService} from '../../services/backend';
import {BookingService} from '../../services/booking';

@Component({
  selector: 'app-verify-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgOtpInputComponent,NgxLoadingModule],
  templateUrl: './verify-contact.component.html',
  styleUrl: './verify-contact.component.scss'
})
export class VerifyContactComponent implements OnInit {
  otpControl = new FormControl('');
  backendService = inject(BackendService);
  loadingConfig = {
    animationType: ngxLoadingAnimationTypes.chasingDots,
    backdropBorderRadius: '10px',
    primaryColour: 'red',
    secondaryColour: 'black',
    fullScreenBackdrop:true,
    tertiaryColour: '#ffffff'
  };

  otpConfig = {
    length: 6,
    allowNumbersOnly: true,
    inputStyles: {
      width: '47px',
      height: '46px',
      fontSize: '18px',
      borderRadius: '5px',
      border: '1px solid red'
    }
  };
  loading=false;
  fb = inject(FormBuilder);
  constructor(public service:BackendService,public bookingService:BookingService,public router:Router){

  }
  ngOnInit(): void {
    this.otpControl.valueChanges.subscribe((otp) => {
      if (otp && otp.length === this.otpConfig.length) {
        this.verifyOtp();
      }
    });
  }

  async verifyOtp() {
    console.log('OTP Entered:', this.otpControl.value);

    let registeringUserData: any = await this.bookingService.getConfig('registeringUser');

    console.log('[Registering User Data: From Local Storage]');
    console.log(registeringUserData);

    this.loading = true;

    const verifyPayload = {
      otp_number: this.otpControl.value,
      gcm_token: "",
      phone: registeringUserData.phone,
      verification_key: registeringUserData.verification_key,
      country_code: registeringUserData.country_code,
      device_number: registeringUserData.device_number,
      sourcetype: "web"
    };

    this.service.verifyOtp(verifyPayload).subscribe((res) => {
      this.loading = false;

      if (res.isSuccess) {
        const verification_key = res.data.verification_key;

        const signupPayload = {
          name: registeringUserData.name,
          phone: registeringUserData.phone,
          country_code: registeringUserData.country_code,
          password:  registeringUserData.password,
          coupons: "",
          currency: "",
          gcm_token: "",
          verification_key: verification_key
        };

        console.log('[Signup Payload]', signupPayload);

        this.backendService.signup(signupPayload).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire({
                icon: 'success',
                title: 'Created',
                text: 'Your account has been created',
                timer: 3000,
                width: '350px',
                customClass: {
                  popup: 'tiny-swal',
                  icon: 'tiny-icon'
                }
              });
              this.router.navigate(['/']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text: "Registration Failed, Please Try again",
                width: '350px',
                showCancelButton: true,
                customClass: {
                  popup: 'tiny-swal',
                  icon: 'tiny-icon'
                }
              });
              this.router.navigate(['/sign-up']);
            }
          },
          error: (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: "Registration Failed, Please Try again",
              width: '350px',
              showCancelButton: true,
              customClass: {
                popup: 'tiny-swal',
                icon: 'tiny-icon'
              }
            });
            this.router.navigate(['/sign-up']);
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Verification',
          text: res.errors.otp[0],
          timer: 3000,
          width: '350px',
          customClass: {
            popup: 'tiny-swal',
            icon: 'tiny-icon'
          }
        });
      }
    });
  }

}
