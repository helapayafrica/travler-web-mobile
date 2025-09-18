import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {AuthService} from '../../../services/auth';
import {BackendService} from '../../../services/backend';
import {BookingService} from '../../../services/booking';
import {LoginModalService} from '../../../services/login-modal';
import {Button} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {DatePicker} from 'primeng/datepicker';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-view-auth-login',
  standalone: true,
  imports: [CommonModule, RouterLink,
    ReactiveFormsModule, InputText, Password, Select, Checkbox],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  showPassword = false;
  hide_password = true; // Toggle password visibility

  country_codes = [
    { code: '254', country: 'Kenya' },
    { code: '255', country: 'Tanzania' },
    { code: '256', country: 'Uganda' },
    { code: '250', country: 'Rwanda' }
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
    public authService:AuthService,
    public service:BackendService,
    public bookingService:BookingService,
    public loginService:LoginModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      country_code: ['254', Validators.required], // Default Kenya
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]], // 7-15 digit phone number
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      console.log(this.loginForm.value);
    }

    this.isSubmitting = true;
    let data:any={"username":this.loginForm.value.phone_number,"password":this.loginForm.value.password,"gcm_token":"","country_code":this.loginForm.value.country_code.value,"sourcetype":"web"}
    console.log(data);
    this.service.login(data).subscribe((res)=>{
      this.isSubmitting = false;
      this.authService.login(res.data);
      this.router.navigateByUrl('/');
    })
  }

  sign() {

  }
}
