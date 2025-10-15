import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {BookingService} from '../../../../services/booking';
import {BackendService} from '../../../../services/backend';
import {AutoComplete, AutoCompleteModule} from 'primeng/autocomplete';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}



@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile-component.html',
  styleUrls: ['./edit-profile-component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutoComplete, FormsModule]
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitted = false;
  isAgent: boolean = false;
  service = inject(BookingService);
  backendService = inject(BackendService);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    const isAgent: boolean | null = this.service.getConfig('isAgent');
    this.isAgent = isAgent ?? false;
    this.setConditionalValidators();
    this.getUserDetails();
    this.getCounty()
    this.getCities()
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      code: ['+254', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      businessName: [''],
      area: [''],
      road: [''],
      city: [''],
      county: [''],
      location: ['']
    });
  }

  setConditionalValidators(): void {
    if (this.isAgent) {
      this.profileForm.get('businessName')?.setValidators(Validators.required);
      this.profileForm.get('area')?.setValidators(Validators.required);
      this.profileForm.get('city')?.setValidators(Validators.required);
      this.profileForm.get('county')?.setValidators(Validators.required);
    } else {
      this.profileForm.get('businessName')?.clearValidators();
      this.profileForm.get('area')?.clearValidators();
      this.profileForm.get('city')?.clearValidators();
      this.profileForm.get('county')?.clearValidators();
    }

    // Update validity
    this.profileForm.get('businessName')?.updateValueAndValidity();
    this.profileForm.get('area')?.updateValueAndValidity();
    this.profileForm.get('city')?.updateValueAndValidity();
    this.profileForm.get('county')?.updateValueAndValidity();
  }
  getUserDetails(): void {
    console.log(']data[');
    const userDetails: any = this.service.getConfig('userData');


    if(userDetails) {

      // Patch form values
      this.profileForm.patchValue({
        firstName: userDetails.name || '',
        lastName: userDetails.last_name || '',
        email: userDetails.email || '',
        gender: userDetails.gender?.toLowerCase() || '',
        identityNumber: userDetails.identityNumber || '',
        phoneNumber: userDetails.phone?.replace('+254', '').trim() || '',
      });


      if (this.isAgent){
        this.profileForm.patchValue({
          businessName: userDetails.agentDetails.business_name || '',
          area: userDetails.agentDetails.area || '',
          road: userDetails.agentDetails.road || '',
          city: userDetails.agentDetails.city || '',
          county: userDetails.agentDetails.county || '',
          location: userDetails.agentDetails.address || ''
        })
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    const formValue = this.profileForm.value;

    // Base payload for all users
    const payload: any = {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      gender: formValue.gender,
      identity_number: formValue.identityNumber,
      phone: formValue.phoneNumber
    };

    // Add agent-specific parameters
    if (this.isAgent) {
      payload.business_name = formValue.businessName;
      payload.area = formValue.area;
      payload.road = formValue.road;
      payload.city = formValue.city;
      payload.county = formValue.county;
      payload.address = formValue.location;
    }

    console.log(payload);
    // Call the service
    this.backendService.updateProfile(payload).subscribe({
      next: (response: any) => {
        console.log('Profile updated successfully', response);
        // Handle success (show message, navigate, etc.)
      },
      error: (error) => {
        console.error('Error updating profile', error);
        // Handle error
      }
    });
  }


  // Getter for easy access to form controls in template
  get f() {
    return this.profileForm.controls;
  }

  counties  :any[]= []
  cities  :any[]= []
  filteredCounties :any[]= []
  selectedCounties  :any[]= []
  getCounty() {
    this.backendService.getCounties().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.isSuccess){
          this.counties = response.county
        }
      },
      error: (error) => {
        console.log(error);
        this.counties =[]
      }
    })
  }

  getCities() {
    this.backendService.getCities().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.isSuccess){
           this.cities = response.data
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // filter Counties

  filterCounty(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.counties as any[]).length; i++) {
      let county = (this.counties as any[])[i];
      if (county.data.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(county);
      }
    }

    this.filteredCounties = filtered;
  }
}
