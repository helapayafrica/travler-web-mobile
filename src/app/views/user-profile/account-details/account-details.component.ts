import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {BookingService} from '../../../services/booking';
import {TranslatePipe} from '@ngx-translate/core';

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
  imports: [CommonModule, RouterLink, TranslatePipe]
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
  service = inject((BookingService))

  ngOnInit(): void {
    // You would fetch account details from a service in a real app
    this.getUserDetails();
  }

  editProfile(): void {
    // Implement edit profile functionality
    // console.log('Edit profile clicked');
  }

  getUserDetails(){
    console.log(']data[')
    const userData: any = this.service.getConfig('userData')
    // console.log(userData);
    if(userData){
       this.userDetails.name = userData.name + ' ' + userData.last_name
      this.userDetails.age = userData.age
      this.userDetails.gender = userData.gender
      this.userDetails.identityNumber = userData.identityNumber
      this.userDetails.email = userData.email
      this.userDetails.mobileNumber = userData.mobileNumber
      this.userDetails.businessName = userData.name + ' ' + userData.last_name

    }

  }
}
