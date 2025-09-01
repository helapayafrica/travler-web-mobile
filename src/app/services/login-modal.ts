import {Injectable, OnInit, signal, Signal} from '@angular/core';
import {LoginModalComponent} from '../shared/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService{
  private modalInstance!: LoginModalComponent;
  isLoginRequired: Signal<boolean> = signal(false);

  register(modal: LoginModalComponent) {
    this.modalInstance = modal;
  }

  openModal() {
    console.log("HEoolo World")
    if (this.modalInstance) {
      console.log("THis isnatas id ok")
      this.modalInstance.openModal();
    }
  }
}
