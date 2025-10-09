import {Component, inject, OnInit} from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UploadPhotoModalComponent} from './modal/upload-photo-modal/upload-photo-modal.component';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../../services/auth';
import {BookingService} from '../../services/booking';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture?: string;
}

@Component({
  selector: 'app-user-profile-layout',
  templateUrl: './user-profile-layout.component.html',
  styleUrls: ['./user-profile-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
  ]
})
export class UserProfileLayoutComponent implements OnInit {
  isAgent = false;
  service = inject((BookingService))
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

  constructor() {
  }

  private modalService = inject(NgbModal);

  ngOnInit(): void {
    // You would typically fetch user data from a service
    this.getUserDetails()
  }

  openCameraModal() {
    const modalRef = this.modalService.open(UploadPhotoModalComponent, {
      backdrop: 'static',
    });

    modalRef.result
      .then((result) => {
        if (result === 'confirm') {
          // Upload the photo
        }
      })
      .catch(() => {
        // Modal was dismissed
      });
  }

  getUserDetails() {
    console.log(']data[')
    const userData: any = this.service.getConfig('userData')
    console.log(userData);
    if (userData) {
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


