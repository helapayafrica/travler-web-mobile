import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly messaga = signal('Where to?')

  setMessage(state: string) {
    switch (state) {
      case "fromCity":
        this.messaga.set("Hi there!  Where will you start your journey?");
        break;
      case "toCity":
        this.messaga.set("Great! And where would you like to go?");
        break;
      case "travelDate":
        this.messaga.set("When would you like to travel?");
        break;
      case "returnDate":
        this.messaga.set("Planning a round trip? When should we bring you back?");
        break;
      default:
        this.messaga.set("Welcome aboard Travellers");
    }
  }


  getMessage(){
    return this.messaga
  }
}
