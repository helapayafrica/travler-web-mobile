import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { BookingService } from '../../../../services/booking';
import { BackendService } from '../../../../services/backend';

@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile-component.html',
  styleUrls: ['./edit-profile-component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutoCompleteModule, FormsModule],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitted = false;
  isAgent = false;

  service = inject(BookingService);
  backendService = inject(BackendService);

  userDetails: any = {};
  counties: any[] = [];
  filteredCounties: any[] = [];

  cities: any[] = [];
  filteredCities: any[] = [];

  idPhoto?: File;
  businessPhoto?: File;
  signature?: File;

  private countiesLoaded = false;
  private citiesLoaded = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.isAgent = this.service.getConfig('isAgent') ?? false;
    this.setConditionalValidators();
    this.getCounty();
    this.getCities();
  }

  // ---------------------
  // FORM INITIALIZATION
  // ---------------------
  initForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      date_of_birth: [''],
      identityNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      code: ['+254', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      businessName: [''],
      area: [''],
      road: [''],
      city: [null],
      county: [null],
      location: [''],
      lat_long: [''],
    });
  }

  // ---------------------
  // VALIDATORS
  // ---------------------
  setConditionalValidators(): void {
    const requiredIfAgent = ['businessName', 'area', 'city', 'county'];
    for (const key of requiredIfAgent) {
      const control = this.profileForm.get(key);
      if (!control) continue;
      if (this.isAgent) control.setValidators(Validators.required);
      else control.clearValidators();
      control.updateValueAndValidity();
    }
  }

  // ---------------------
  // GET USER DETAILS
  // ---------------------
  getUserDetails(): void {
    const userDetails: any = this.service.getConfig('userData');
    if (!userDetails) return;

    this.userDetails = userDetails;

    this.profileForm.patchValue({
      firstName: userDetails.name || '',
      lastName: userDetails.last_name || '',
      email: userDetails.email || '',
      gender: userDetails.gender?.toLowerCase() || '',
      age: userDetails.age || '',
      date_of_birth: userDetails.date_of_birth || '',
      identityNumber: userDetails.identityNumber || '',
      phoneNumber: userDetails.phone?.replace('+254', '').trim() || '',
    });

    if (this.isAgent && userDetails.agentDetails) {
      // Find the actual objects from the arrays
      const countyObj = this.counties.find(c => c.data === userDetails.agentDetails.county);
      const cityObj = this.cities.find(c => c.city_name === userDetails.agentDetails.city);

      this.profileForm.patchValue({
        businessName: userDetails.agentDetails.business_name || '',
        area: userDetails.agentDetails.area || '',
        road: userDetails.agentDetails.road || '',
        city: cityObj || null,
        county: countyObj || null,
        location: userDetails.agentDetails.address || '',
        lat_long: userDetails.agentDetails.lat_long || '',
      });
    }
  }

  // ---------------------
  // API CALLS
  // ---------------------
  getCounty() {
    this.backendService.getCounties().subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.counties = response.county || [];
          this.countiesLoaded = true;
          this.checkAndLoadUserDetails();
        }
      },
      error: () => {
        this.counties = [];
        this.countiesLoaded = true;
        this.checkAndLoadUserDetails();
      },
    });
  }

  getCities() {
    this.backendService.getCities().subscribe({
      next: (response: any) => {
        if (response.isSuccess) {
          this.cities = response.data || [];
          this.citiesLoaded = true;
          this.checkAndLoadUserDetails();
        }
      },
      error: (error) => {
        console.error(error);
        this.cities = [];
        this.citiesLoaded = true;
        this.checkAndLoadUserDetails();
      },
    });
  }

  checkAndLoadUserDetails() {
    if (this.countiesLoaded && this.citiesLoaded) {
      this.getUserDetails();
    }
  }

  // ---------------------
  // AUTOCOMPLETE FILTERS
  // ---------------------
  filterCounty(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredCounties = this.counties.filter((county: any) =>
      county.data.toLowerCase().includes(query)
    );
  }

  filterCity(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredCities = this.cities.filter((city: any) =>
      city.city_name.toLowerCase().includes(query)
    );

    // console.log(this.filteredCities)
  }

  // ---------------------
  // FILE HANDLING
  // ---------------------
  onFileSelect(event: Event, field: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    switch (field) {
      case 'id_photo':
        this.idPhoto = file;
        break;
      case 'business_photo':
        this.businessPhoto = file;
        break;
      case 'signature':
        this.signature = file;
        break;
    }
  }

  // ---------------------
  // FORM SUBMIT
  // ---------------------
  onSubmit(): void {
    this.submitted = true;
    if (this.profileForm.invalid) return;

    const formValue = this.profileForm.value;
    const formData = new FormData();

    // --- Fix: Extract readable text from selected objects ---
    const selectedCounty =
      typeof formValue.county === 'object' && formValue.county
        ? formValue.county.data
        : formValue.county || '';

    const selectedCity =
      typeof formValue.city === 'object' && formValue.city
        ? formValue.city.city_name
        : formValue.city || '';

    // --- Normal fields ---
    formData.append('name', formValue.firstName);
    formData.append('last_name', formValue.lastName);
    formData.append('middle_name', formValue.code);
    formData.append('email', formValue.email);
    formData.append('gender', formValue.gender);
    formData.append('date_of_birth', formValue.date_of_birth);
    formData.append('lat_long', formValue.lat_long);
    formData.append('age', formValue.age);
    formData.append('state', '');
    formData.append('country', '');
    formData.append('country_code', formValue.code);
    formData.append('identity_number', formValue.identityNumber);
    formData.append('phone', formValue.phoneNumber);

    if (this.isAgent) {
      formData.append('business_name', formValue.businessName || '');
      formData.append('area', formValue.area || '');
      formData.append('road', formValue.road || '');
      formData.append('city', selectedCity);
      formData.append('county', selectedCounty);
      formData.append('address', formValue.location || '');

      if (this.idPhoto)
        formData.append('AgentDetails[id_photo]', this.idPhoto, this.idPhoto.name);
      if (this.businessPhoto)
        formData.append('AgentDetails[business_photo]', this.businessPhoto, this.businessPhoto.name);
      if (this.signature)
        formData.append('AgentDetails[signature]', this.signature, this.signature.name);
    }

    // Debug
    for (const pair of formData.entries()) console.log(pair[0], pair[1]);

    this.backendService.updateProfile(formData).subscribe({
      next: (response: any) => console.log('Profile updated successfully', response),
      error: (error) => console.error('Error updating profile', error),
    });
  }

  // ---------------------
  // GETTER
  // ---------------------
  get f() {
    return this.profileForm.controls;
  }
}
