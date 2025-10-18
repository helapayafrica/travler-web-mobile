import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {BackendService} from '../../../services/backend';
import {RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {ModalService} from '../../../services/modal';
import {BookingService} from '../../../services/booking';

@Component({
  selector: 'app-forgot-password',
  imports: [
    TranslatePipe,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword implements OnInit {
  bookingService = inject(BookingService)
  ngOnInit(): void {
    this.form = new FormGroup({
      country_code : new FormControl('', Validators.required),
      phone : new FormControl('', Validators.required)

    })
  }

  codes = [
    { value: '254', label: '+254' },
    { value: '255', label: '+255' },
    { value: '256', label: '+256' },
    { value: '250', label: '+250' }
  ];

  form!: FormGroup;
  backendService = inject(BackendService)
  modalService = inject(ModalService)
  onSubmit() {
    // this.modalService.openModal('forgotPasswordVerificationModal')

    console.log(this.form.value)
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    // payload
    // {"phone":"768488012","country_code":"254","device_number":"z5ctylxt3ddseldg10exuh","sourcetype":"web"}


    const country_code = this.form.controls['country_code'].value;
    const phone = this.form.controls['phone'].value.replace(/^0+/, '').trim()
     const device_number = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)


    let data = {country_code, phone, device_number}



    this.backendService.forgotPassword(data).subscribe({
      next: response => {
        console.log(response)
          if (response.isSuccess) {
            const newData = {
              ...data,
              verification_key: Number(response.verification_key),
              date : new Date()
            }
            this.bookingService.setConfig('forgotPasswordDetails', newData)
            this.modalService.openModal('forgotPasswordVerificationModal')
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Verification',
              text:response.errors.otp[0],
              timer: 3000, // Auto-close after 3 seconds
              width: '350px',
              customClass: {
                popup: 'tiny-swal',
                icon: 'tiny-icon'
              }
            });
          }
      },
      error: error => {},
      complete: () => {}
    })
  }
}
