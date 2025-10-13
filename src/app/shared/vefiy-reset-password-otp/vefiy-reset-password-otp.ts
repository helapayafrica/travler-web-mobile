import {Component, inject, OnInit} from '@angular/core';
import {NgOtpInputComponent} from "ng-otp-input";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {BackendService} from '../../services/backend';
import {BookingService} from '../../services/booking';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vefiy-reset-password-otp',
  imports: [
    NgOtpInputComponent,
    NgxLoadingModule,
    ReactiveFormsModule
  ],
  templateUrl: './verify-reset-password-otp.html',
  styleUrl: './verify-reset-password-otp.scss'
})
export class VefiyResetPasswordOtp implements OnInit {
  otpControl = new FormControl('');
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
        Swal.fire({
          icon: 'success',
          title: 'Confirmed',
          text:'OTP Confirmed',
          timer: 3000, // Auto-close after 3 seconds
          width: '350px',
          customClass: {
            popup: 'tiny-swal',
            icon: 'tiny-icon'
          }
        });
        //todo Add guard for reset-password page
        const resetOtp = true

        this.router.navigate(['/reset-password'])
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
