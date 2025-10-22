import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {App} from './app/app';
import {importProvidersFrom, isDevMode} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {httpInterceptor} from './app/services/core/interceptors/interceptor';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';

// Import your existing app config and merge with service worker
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(BrowserAnimationsModule),
    // Add service worker provider
    ...(ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }).providers || [])
  ]
};


bootstrapApplication(App, updatedAppConfig)
  .catch((err) => console.error(err));
