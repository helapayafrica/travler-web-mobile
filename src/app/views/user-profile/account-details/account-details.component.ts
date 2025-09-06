import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

interface UserDetails {
  name: string;
  age: number;
  gender: string;
  identityNumber: string;
  email: string;
  mobileNumber: string;
  businessName: string;
  area: string;
  road: string;
  address: string;
  city: string;
  county: string;
  identityPhoto?: string;
  businessPhoto?: string;
  signature?: string;
}

@Component({
  selector: 'app-view-user-profile-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class AccountDetailsComponent implements OnInit {
  userDetails: UserDetails = {
    name: 'Davis Mutuku',
    age: 0,
    gender: 'Male',
    identityNumber: '0000',
    email: 'davis@helapay.africa',
    mobileNumber: '+254 777777777',
    businessName: 'Davis Mutinda',
    area: 'Nairobi',
    road: 'Mombasa Road',
    address: 'MVH2+H54, Likoni Rd, Nairobi, Kenya',
    city: 'NAIROBI',
    county: 'Nairobi'
  };

  constructor() { }

  ngOnInit(): void {
    // You would fetch account details from a service in a real app
  }

  editProfile(): void {
    // Implement edit profile functionality
    // console.log('Edit profile clicked');
  }
}
