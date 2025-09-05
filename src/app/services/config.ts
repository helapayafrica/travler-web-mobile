import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Config {
  config:any={
    // "token":'23D233D0-D78A-40C2-A211-19185B0C9E73',
    "token":'DEV123-DEV-DEV-DEV321',
    "paybill":"3902023"
  }




  constructor() {
  }


  getConfig(key: string): any {
    return this.config ? this.config[key] : null;
  }
}
