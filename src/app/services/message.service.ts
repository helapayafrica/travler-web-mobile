import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly message;

  constructor(private translate: TranslateService) {
    this.message = signal(this.translate.instant('whereTo'));
  }

  setMessage(state: string) {

    switch (state) {
      case 'fromCity':
        this.message.set(this.translate.instant('messages.fromCity'));
        break;
      case 'toCity':
        this.message.set(this.translate.instant('messages.toCity'));
        break;
      case 'travelDate':
        this.message.set(this.translate.instant('messages.travelDate'));
        break;
      case 'returnDate':
        this.message.set(this.translate.instant('messages.returnDate'));
        break;
      default:
        this.message.set(this.translate.instant('messages.default'));
    }
  }
}
