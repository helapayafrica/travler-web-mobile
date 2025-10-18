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
import {InputText} from 'primeng/inputtext';
import {Checkbox} from 'primeng/checkbox';
import {DatePicker, DatePickerModule} from 'primeng/datepicker';
import {Password} from 'primeng/password';
import {Select} from 'primeng/select';
import {TranslatePipe} from '@ngx-translate/core';



@Component({
  selector: 'app-view-auth-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxLoadingModule, InputText, Checkbox, RouterLink,
    DatePickerModule, Password, Select, TranslatePipe],
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
  today = new Date()
  maxDOB = new Date(this.today.getFullYear() - 13, this.today.getMonth(), this.today.getDate());

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
      // last_name: [' ', [Validators.required]],
      // date_of_birth: [ this.maxDOB, [Validators.required, ageValidator()]],
      more: [false, [Validators.required]],
      coupon_code:[''],
      // gender: [''],
      phone_number:['', [Validators.required]],
      country_code:['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
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
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    let data = this.signupForm.value;
    console.log('[Form Data]', data);

    this.loading = true;
    this.isSubmitting = true;

    this.payload.device_number = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.payload.phone = data.phone_number

    console.log(this.payload);

    this.service.sendOtp(this.payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.isSubmitting = false;

        if (res.isSuccess) {
          this.modalService.openModal('verificationModal');
          // let info = {
          //   "otp_number": "",
          //   "device_number": Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          //   "gcm_token": "",
          //   "phone": String(data.phone_number),
          //   "verification_key": res.verification_key,
          //   "country_code": data.country_code.value,
          //   "name": data.name,
          //   "sourcetype": "web"
          // };
          console.log('[Send Otp Response]')
          console.log(res)
          // this.bookingService.setConfig('verification', info);

          const registeringUser = {
            name: this.signupForm.value.name,
            phone: this.payload.phone,
            password: this.signupForm.value.password,
            country_code: this.payload.country_code,
            device_number: this.payload.device_number,
            coupon_code: this.payload.coupon_code,
            verification_key:  Number(res.verification_key),
            currency_code: "",
            gcm_token: "",
            sourcetype: "web"
          };
          console.log('[Registering User data being saved in local storage]')
          console.log(registeringUser);
          this.bookingService.setConfig('registeringUser', registeringUser);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: res.message,
            width: '350px',
            showCancelButton: true,
            customClass: {
              popup: 'tiny-swal',
              icon: 'tiny-icon'
            }
          });
        }
      },
      error: (err) => {
        this.loading = false;
        this.isSubmitting = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again.',
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

