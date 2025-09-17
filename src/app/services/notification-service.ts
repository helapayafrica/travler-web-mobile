// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // replace with your own VAPID public key
  // todo: Replace with your own VAPID public key AND url
  private readonly vapidPublicKey = 'YOUR_PUBLIC_VAPID_KEY';
  private readonly subscribeUrl   = '/api/subscribe'; // backend endpoint

  constructor(private swPush: SwPush, private http: HttpClient) {}

  /** Request browser permission and send subscription to server */
  async subscribeUser(): Promise<void> {
    if (!this.swPush.isEnabled) {
      console.warn('Service worker or push not enabled.');
      return;
    }

    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.vapidPublicKey,
      });

      await this.http.post(this.subscribeUrl, sub).toPromise();
      console.log('Push subscription sent to server');
    } catch (err) {
      console.error('Subscription failed', err);
    }
  }

  /** Optional: listen to incoming messages when app is open */
  listenForMessages(): void {
    this.swPush.messages.subscribe(msg =>
      console.log('Push message received:', msg)
    );
    this.swPush.notificationClicks.subscribe(event =>
      console.log('Notification clicked:', event)
    );
  }
}
