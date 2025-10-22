import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {BackendService} from '../../services/backend';
import html2pdf from 'html2pdf.js';

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
  backendService = inject(BackendService)

  constructor(private fb: FormBuilder) {
    this.printTicketForm = this.fb.group({
      ticketNumber: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^\\+?\\d{10,13}$')]]
    });


  }

  onSubmit() {
    this.submitted = true;
    const phone = this.printTicketForm.get('mobileNumber')?.value.replace(/^(0|\+254)/, '254').trim()
    console.log(phone, '[PHome]')

    const payload = {
      ticket_number: this.printTicketForm.get('ticketNumber')?.value.trim(),
      phone
    }
    this.backendService.printTicket(payload).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.isSuccess == true) {
          this.downloadTicket(res.data)
        }
      },
      error: (err) => {
        console.log(err)
        console.log("error Logging")
      }
    })


    if (this.printTicketForm.valid) {
      console.log('Form Submitted:', this.printTicketForm.value);
    } else {
      console.log('Validation Errors:', this.printTicketForm.errors);
    }
  }


  downloadTicket(data: string) {
    const container = document.createElement('div');
    container.innerHTML = data; // inject your HTML string
    const options: any = {
      margin: 0,
      filename: `TRAVLER_TICKET_${this.printTicketForm.get('ticketNumber')?.value || ''}.pdf`,
      image: {type: 'jpeg', quality: 0.9},
      html2canvas: {scale: 2},
      jsPDF: {unit: 'mm', format: [210, 99], orientation: 'landscape'}
    };
    

    html2pdf().set(options).from(container).save();
  }


}
