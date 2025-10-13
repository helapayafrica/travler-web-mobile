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
    let payload:any = await this.bookingService.getConfig('verification');
    payload.otp_number=this.otpControl.value
    console.log(payload);
    this.loading=true

    this.service.verifyOtp(payload).subscribe((res)=>{
      this.loading=false;
      if(res.isSuccess){
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Created',
        //   text:'Your account has been created',
        //   timer: 3000, // Auto-close after 3 seconds
        //   width: '350px',
        //   customClass: {
        //     popup: 'tiny-swal',
        //     icon: 'tiny-icon'
        //   }
        // });
        const verification_key = res.data.verification_key
        const registeringUserData = this.bookingService.getConfig('registeringUser')
        if(registeringUserData){
          const payload = {
            ...registeringUserData,
            verification_key: verification_key ? verification_key : ""
          }
          this.backendService.signup(payload).subscribe({
            next:(response)=>{
              if (response.isSuccess){
                Swal.fire({
                  icon: 'success',
                  title: 'Created',
                  text:'Your account has been created',
                  timer: 3000, // Auto-close after 3 seconds
                  width: '350px',
                  customClass: {
                    popup: 'tiny-swal',
                    icon: 'tiny-icon'
                  }
                });
                this.router.navigate(['/']);

              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Request Failed',
                  text:"Registration Failed, Please Try again",
                  width: '350px',
                  showCancelButton:true,
                  customClass: {
                    popup: 'tiny-swal',
                    icon: 'tiny-icon'
                  }
                });

                this.router.navigate(['/sign-up']);
              }
            },
            error: (error) => {
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text:"Registration Failed, Please Try again",
                width: '350px',
                showCancelButton:true,
                customClass: {
                  popup: 'tiny-swal',
                  icon: 'tiny-icon'
                }
              });

              this.router.navigate(['/sign-up']);
            }
          })
        }

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Verification',
          text:res.errors.otp[0],
          timer: 3000, // Auto-close after 3 seconds
          width: '350px',
          customClass: {
            popup: 'tiny-swal',
            icon: 'tiny-icon'
          }
        });
      }
    })
    // let payload={"otp_number":this.otpControl.value,"device_number":Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),"gcm_token":"","phone":"742700488","verification_key":80228619,"country_code":"254","sourcetype":"web"}

    // 🔹 Call API to verify OTP here
    // this.authService.verifyOtp(this.otpControl.value).subscribe(response => { ... });

  }

}
