import { Component, signal, OnInit, OnDestroy, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {LoginModalComponent} from './shared/login-modal/login-modal.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {BottomNav} from './views/home/sections/bottom-nav/bottom-nav';
import {VerifyContactComponent} from './shared/verify-contact/verify-contact.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginModalComponent, FooterComponent, BottomNav, NavbarComponent, VerifyContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private readonly DESKTOP_SITE_URL = 'https://traveler.helapay.africa/'; // Change this to your desktop site URL
  private resizeSubscription?: any;

  // Signals
  protected readonly title = signal('travler-mobile');
  private screenWidth = signal(this.getWindowWidth());
  protected isSmOrAbove = signal(false);

  constructor() {
    // Initialize signals
    this.updateScreenSize();

    // Effect to monitor screen size changes and redirect
    effect(() => {
      const isLarge = this.isSmOrAbove();
      // console.log("IS Sm?", isLarge);

      if (isLarge) {
        // console.log('Screen is sm or above, redirecting to desktop site...');
        // window.location.href = this.DESKTOP_SITE_URL;
      }
    });
  }

  ngOnInit() {
    this.startMonitoringScreenSize();
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  /**
   * Get current window width
   */
  private getWindowWidth(): number {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0; // Default for SSR
  }

  /**
   * Update screen size signals
   */
  private updateScreenSize(): void {
    const width = this.getWindowWidth();
    this.screenWidth.set(width);
    this.isSmOrAbove.set(width >= 640);
  }

  /**
   * Start monitoring screen size changes
   */
  private startMonitoringScreenSize(): void {
    if (typeof window !== 'undefined') {
      this.resizeSubscription = fromEvent(window, 'resize')
        .pipe(debounceTime(300)) // Wait 300ms after resize stops
        .subscribe(() => {
          this.updateScreenSize();
        });
    }
  }
}
