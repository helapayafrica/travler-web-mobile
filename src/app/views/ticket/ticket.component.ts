import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  printTicketForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.printTicketForm = this.fb.group({
      ticketNumber: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^\\d{10,12}$')]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.printTicketForm.valid) {
      console.log('Form Submitted:', this.printTicketForm.value);
    } else {
      console.log('Validation Errors:', this.printTicketForm.errors);
    }
  }
}
