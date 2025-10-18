import {Component, inject} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Password} from "primeng/password";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {BackendService} from '../../../services/backend';
import {BookingService} from '../../../services/booking';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  imports: [
    NgIf,
    Password,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }

  bookingService = inject(BookingService)
  router = inject(Router)
  backend = inject(BackendService)
  onSubmit() {
    if (this.passwordForm.valid) {
      // Implement password change logic
      console.log('Password change submitted', this.passwordForm.value);
      // paylod example
      // {"phone":"768488012","newPassword":"Sam@iabiri?","confirmPassword":"Sam@iabiri?","country_code":"254","sourcetype":"web"}
      let data : any = this.bookingService.getConfig('forgotPasswordDetails');
      if(!data){
        this.router.navigate(['/login']);
      }
      let payload = {
        ... this.passwordForm.value,
        phone : data.phone,
        country_code: data.country_code,
        sourcetype : "web"
      }
      this.backend.resetPassword(payload).subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            Swal.fire({
              icon: 'success',
              title: 'Reset success password',
              text:'Your password has been reset',
              timer: 3000, // Auto-close after 3 seconds
              width: '350px',
              customClass: {
                popup: 'tiny-swal',
                icon: 'tiny-icon'
              }
            });
            this.router.navigate(['/login']);
            this.bookingService.setConfig('forgotPasswordDetails', {})
          }else {
            Swal.fire({
              icon: 'error',
              title: 'Verification',
              text:res.msg,
              timer: 3000, // Auto-close after 3 seconds
              width: '350px',
              customClass: {
                popup: 'tiny-swal',
                icon: 'tiny-icon'
              }
            });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Verification',
            text:"Reset Failed",
            timer: 3000, // Auto-close after 3 seconds
            width: '350px',
            customClass: {
              popup: 'tiny-swal',
              icon: 'tiny-icon'
            }
          });
        }
        , complete: () =>{
          console.log("complete change password")
        }
      })
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.passwordForm.controls).forEach(key => {
        this.passwordForm.get(key)?.markAsTouched();
      });
    }
  }
}
