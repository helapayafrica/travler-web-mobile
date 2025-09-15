import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly message = signal('Where to?')

  setMessage(state: string) {
    switch (state) {
      case "fromCity":
        this.message.set("Hi there!  Where will you start your journey?");
        break;
      case "toCity":
        this.message.set("Great! And where would you like to go?");
        break;
      case "travelDate":
        this.message.set("When would you like to travel?");
        break;
      case "returnDate":
        // this.message.set("Planning a round trip? When should we bring you back?");
        this.message.set("Round trip – specify return time.");
        break;
      default:
        this.message.set("Welcome aboard Travellers");
    }
  }
  // setMessage(state: string) {
  //   switch (state) {
  //     case "fromCity":
  //       this.message.set("🚌 Which city are you leaving from?");
  //       break;
  //     case "toCity":
  //       this.message.set("📍 Which city are you going to?");
  //       break;
  //     case "travelDate":
  //       this.message.set("📅 When will you travel?");
  //       break;
  //     case "returnDate":
  //       this.message.set("🔄 When is your return trip?");
  //       break;
  //     default:
  //       this.message.set("👋 Welcome aboard! Let’s get started.");
  //   }
  // }





  getMessage(){
    return this.message
  }
}
