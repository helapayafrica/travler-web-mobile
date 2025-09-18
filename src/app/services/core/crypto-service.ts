import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  private readonly key = 'secret';
  encrypt(value :string): string {
    return CryptoJS.AES.encrypt(value, this.key).toString();
  }
  decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
