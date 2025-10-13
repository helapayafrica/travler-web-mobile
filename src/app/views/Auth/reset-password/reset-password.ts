import {Component, inject} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Password} from "primeng/password";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {BackendService} from '../../../services/backend';

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

  backend = inject(BackendService)
  onSubmit() {
    if (this.passwordForm.valid) {
      // Implement password change logic
      console.log('Password change submitted', this.passwordForm.value);
      this.backend.resetPassword(this.passwordForm.value).subscribe({
        next: (res) => {
          console.log(res)
          // navigate to login
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
