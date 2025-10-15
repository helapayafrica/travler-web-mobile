import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {BookingService} from '../../../services/booking';
import {BackendService} from '../../../services/backend';
import {Password} from 'primeng/password';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user-profile-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, Password]
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
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

  backend = inject(BackendService)
  onSubmit() {
    if (this.passwordForm.valid) {
      // Implement password change logic
      console.log('Password change submitted', this.passwordForm.value);
      this.backend.changePassword(this.passwordForm.value).subscribe({
          next: (res) => {
            if (res.isSuccess == true) {
              Swal.fire({
                icon: 'success',
                title: "Password change Success",
                text:res.msg,
                timer: 3000, // Auto-close after 3 seconds
                width: '350px',
                customClass: {
                  popup: 'tiny-swal',
                  icon: 'tiny-icon'
                }
              });
              this.passwordForm.reset()
            }else {
              Swal.fire({
                icon: 'error',
                title: 'Failed',
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
          console.log(err)
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
