import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import { NgOtpInputComponent } from 'ng-otp-input';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import Swal from 'sweetalert2';
import {ModalService} from '../../../services/modal';
import {BackendService} from '../../../services/backend';
import {BookingService} from '../../../services/booking';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {DatePicker, DatePickerModule} from 'primeng/datepicker';
import {Password} from 'primeng/password';
import {Select} from 'primeng/select';



@Component({
  selector: 'app-view-auth-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxLoadingModule, InputText, Checkbox, DatePicker, RouterLink,
    DatePickerModule, Password, Select],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignupComponent implements OnInit {
  payload:any={"phone":"742700488","country_code":"254","device_number":"20ow72udawc8ra2m8lge34","sourcetype":"web"}
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
    inputClass: 'otp-input'
  };
  loading = false;
  signupForm!: FormGroup;
  isSubmitting = false;
  showPassword = false;
  country_codes = [
    {code: '254', country: 'Kenya'},
    {code: '255', country: 'Tanzania'},
    {code: '256', country: 'Uganda'},
    {code: '250', country: 'Rwanda'}
  ];

  codes = [
    { value: '254', label: '+254' },
    { value: '255', label: '+255' },
    { value: '256', label: '+256' },
    { value: '250', label: '+250' }
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public modalService:ModalService,
    public service:BackendService,
    public bookingService:BookingService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required, ageValidator()]],
      more: [false, [Validators.required]],
      coupon_code:[''],
      gender: [''],
      phone_number:['', [Validators.required]],
      country_code:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
      ]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });

  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    let data = this.signupForm.value

    console.log(data)
    // this.loading=true;
    // this.payload.device_number= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // this.payload.phone=data.phone_number
    // this.payload.country_code=data.country_code
    // console.log(this.payload);
    // this.service.sendOtp(this.payload).subscribe((res)=>{
    //   this.loading=false;
    //   if(res.isSuccess){
    //     this.modalService.openModal('verificationModal');
    //     let info={"otp_number":"","device_number":Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),"gcm_token":"","phone":data.phone_number,"verification_key":res.verification_key,"country_code":data.country_code,"sourcetype":"web"}
    //     this.bookingService.setConfig('verification',info);
    //   }else{
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Request Failed',
    //       text:res.message,
    //       width: '350px',
    //       showCancelButton:true,
    //       customClass: {
    //         popup: 'tiny-swal',
    //         icon: 'tiny-icon'
    //       }
    //     });
    //   }
    //
    // })
    // if (this.signupForm.invalid) {
    //   Object.keys(this.signupForm.controls).forEach(key => {
    //     const control = this.signupForm.get(key);
    //     control?.markAsTouched();
    //   });
    //   return;
    // }

    // this.isSubmitting = true;


  }
}

export function ageValidator(): ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 13) {
      return {underage: true};
    }

    return null;
  };
}
