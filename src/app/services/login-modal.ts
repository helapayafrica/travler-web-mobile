import {inject, Injectable, OnInit, signal, Signal} from '@angular/core';
import {LoginModalComponent} from '../shared/login-modal/login-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService{
  currentUrl = "/";
  router = inject(Router)

  private modalInstance!: LoginModalComponent;
  isLoginRequired: Signal<boolean> = signal(false);

  register(modal: LoginModalComponent) {
    this.modalInstance = modal;
  }

  openModal(currentUrl: string) {
    if (this.modalInstance) {
      this.currentUrl = currentUrl
      this.modalInstance.openModal();
    }
  }

  navigateToUrl(){
    this.router.navigate([this.currentUrl]);

  }
}
