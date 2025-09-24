import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  contactForm: FormGroup;
  email='infoTravler.com';
  countryCodes = [
    { code: '+254', name: 'Kenya' }, // Reference point
    { code: '+255', name: 'Tanzania' },
    { code: '+256', name: 'Uganda' },
    { code: '+257', name: 'Burundi' },
    { code: '+250', name: 'Rwanda' },
    { code: '+211', name: 'South Sudan' },
    { code: '+252', name: 'Somalia' },
    { code: '+253', name: 'Djibouti' },
    { code: '+260', name: 'Zambia' },
    { code: '+251', name: 'Ethiopia' },
    { code: '+263', name: 'Zimbabwe' },
    { code: '+258', name: 'Mozambique' },
    { code: '+249', name: 'Sudan' },
    { code: '+243', name: 'DR Congo' },
    { code: '+248', name: 'Seychelles' },
    { code: '+269', name: 'Comoros' },
    { code: '+230', name: 'Mauritius' },
    { code: '+261', name: 'Madagascar' }
  ];


  phoneNumbers = ['0709215215', '0709215200', '0709215400', '0730790215', '0730790200', '0730790400'];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      mobileId: ['+254', Validators.required], // Default Kenya
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{9,12}$')]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      company: ['Travler', Validators.required], // Default company
      sourcetype: ['web'] // Hidden field, default is 'web'
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
