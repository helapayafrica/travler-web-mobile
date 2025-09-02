import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-photo-modal',
  standalone: true,
  imports: [],
  templateUrl: './upload-photo-modal.component.html',
  styleUrl: './upload-photo-modal.component.scss'
})
export class UploadPhotoModalComponent {

  selectedFile: File |null = null;
  constructor(public activeModal: NgbActiveModal) {
  }

  confirm(){
    this.activeModal.close(this.selectedFile);
  }

  cancel(){
    this.activeModal.close('cancel');
  }

  onFileChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
