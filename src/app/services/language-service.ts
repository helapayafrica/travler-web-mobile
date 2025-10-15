import {inject, Injectable, signal} from '@angular/core';
import { BookingService } from './booking';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private bookingService = inject(BookingService);
  private translate = inject(TranslateService);
  language = signal<string>('en');

  constructor() {
    this.translate.addLangs(['sw', 'en']);
    this.translate.setDefaultLang('en');
    this.getLanguage();


    // Debug here instead
    console.log("LanguageService initialized");
    console.log("Current language:", this.language());
  }

  getLanguage() {
    const lang: string | null = this.bookingService.getConfig('lang');

    if (lang === 'en' || lang === 'sw') { // Changed 'ks' to 'sw'?
      this.language.set(lang);
      this.translate.use(lang);
    } else {
      // No saved language, use default
      this.language.set('en');
      this.bookingService.setConfig('lang', 'en');
      this.translate.use('en');
    }
  }

  setLanguage(lang: string) {
    this.language.set(lang);
    this.bookingService.setConfig('lang', lang);
    this.translate.use(lang);
    console.log("Language changed to:", lang); // Debug
  }

  toggleLanguage() {
    const newLang = this.language() === 'en' ? 'sw' : 'en';
    this.setLanguage(newLang);
  }

  getLanguageString(){
    console.log("LanguageService  getLanguageString");
    // console.log(this.language())
    return this.language;
  }
}
