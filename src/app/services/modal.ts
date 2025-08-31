import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalInstance?: Modal;

  constructor() {}

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show();
    } else {
      console.error(`Modal with ID '${modalId}' not found.`);
    }
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = undefined;
    }
  }
}
