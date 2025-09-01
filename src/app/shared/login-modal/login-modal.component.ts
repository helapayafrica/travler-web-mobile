import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

import {LogoComponent} from '../logo/logo.component';
import {BackendService} from '../../services/backend';
import {LoginModalService} from '../../services/login-modal';
import {BookingService} from '../../services/booking';
import {ModalService} from '../../services/modal';
import {AuthService} from '../../services/auth';
import {Checkbox} from 'primeng/checkbox';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxLoadingModule, RouterLink, Checkbox, InputText, Password, Select],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  loading = false;
  loadingConfig = {
    animationType: ngxLoadingAnimationTypes.chasingDots,
    backdropBorderRadius: '10px',
    primaryColour: 'red',
    secondaryColour: 'black',
    fullScreenBackdrop:true,
    tertiaryColour: '#ffffff'
  };

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

  isSubmitting = false;
  showPassword = false;
  hide_password = true; // Toggle password visibility

  @ViewChild('loginModal') loginModal!: ElementRef;
  modalInstance: any;
  fb = inject(FormBuilder);
  loginModalService = inject(LoginModalService);
  constructor(public service:BackendService,public bookingService:BookingService,public router:Router,public modalService:ModalService,public authService:AuthService){

  }
  loginForm = this.fb.group({
    country_code: ['254', Validators.required], // Default Kenya
    phone_number: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]], // 7-15 digit phone number
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  ngAfterViewInit() {
    this.loginModalService.register(this);
  }

  openModal() {
    console.log("MOdal Open")
    if (!this.modalInstance) {
      this.modalInstance = new Modal(this.loginModal.nativeElement);
    }
    console.log("MOdal Open 2")

    this.modalInstance.show();
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log(this.loginForm.value);
    }

    this.loading=true;
    this.isSubmitting = true;
    let data:any={"username":this.loginForm.value.phone_number,"password":this.loginForm.value.password,"gcm_token":"","country_code":this.loginForm.value.country_code,"sourcetype":"web"}
    this.service.login(data).subscribe((res)=>{
      this.isSubmitting = false;
      this.authService.login(res.data);
      this.loading=false;
      this.modalService.closeModal();
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  continue(){
    this.router.navigateByUrl('/checkout');
    this.closeModal();
  }

  sign(){
    this.modalService.closeModal();
    this.router.navigateByUrl('/signup');

  }


}



