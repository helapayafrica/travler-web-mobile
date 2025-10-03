import {Component, inject, OnInit} from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UploadPhotoModalComponent} from './modal/upload-photo-modal/upload-photo-modal.component';
import {TranslatePipe} from '@ngx-translate/core';

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
  isAgent = true;
  userProfile: UserProfile = {
    id: 'usr123456',
    firstName: 'Davis',
    lastName: 'Mutuku',
    email: 'davis@helapay.africa',
    phone: '+254 777777777',
    profilePicture: 'https://placehold.co/600x400'
  };

  constructor() { }

  private modalService = inject(NgbModal);
  ngOnInit(): void {
    // You would typically fetch user data from a service
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

}
