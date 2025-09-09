import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly messaga = signal('Where to?')

  // setMessage(state: string) {
  //   switch (state) {
  //     case "fromCity":
  //       this.messaga.set("Hi there!  Where will you start your journey?");
  //       break;
  //     case "toCity":
  //       this.messaga.set("Great! And where would you like to go?");
  //       break;
  //     case "travelDate":
  //       this.messaga.set("When would you like to travel?");
  //       break;
  //     case "returnDate":
  //       this.messaga.set("Planning a round trip? When should we bring you back?");
  //       break;
  //     default:
  //       this.messaga.set("Welcome aboard Travellers");
  //   }
  // }
  setMessage(state: string) {
    switch (state) {
      case "fromCity":
        this.messaga.set("🚌 Which city are you leaving from?");
        break;
      case "toCity":
        this.messaga.set("📍 Which city are you going to?");
        break;
      case "travelDate":
        this.messaga.set("📅 When will you travel?");
        break;
      case "returnDate":
        this.messaga.set("🔄 When is your return trip?");
        break;
      default:
        this.messaga.set("👋 Welcome aboard! Let’s get started.");
    }
  }





  getMessage(){
    return this.messaga
  }
}
