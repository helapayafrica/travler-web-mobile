// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
//
// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { ConfigService } from './app/shared/services/config.service';
// import { httpInterceptor } from './app/shared/services/interceptor';


// async function bootstrap() {

//   // Provide ConfigService and HttpClient
//   const customAppConfig = {
//     ...appConfig,
//     providers: [
//       ...appConfig.providers,
//       provideHttpClient(withInterceptors([httpInterceptor])),
//     ],
//   };

//   // Bootstrap the application
//   bootstrapApplication(AppComponent, customAppConfig).catch((err) => console.error(err));
// }

// bootstrap();

import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { appConfig } from './app/app.config';

// import { provideToastr } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import {httpInterceptor} from './app/services/interceptor';
import {App} from './app/app';

async function bootstrap() {
  // Provide ConfigService and HttpClient
  const customAppConfig = {
    ...appConfig,
    providers: [
      ...appConfig.providers,
      provideHttpClient(withInterceptors([httpInterceptor])),
      provideAnimations(),
      // provideToastr(),
      importProvidersFrom(BrowserAnimationsModule)
    ],
  };
  // Bootstrap the application
  bootstrapApplication(App, customAppConfig).catch((err) => console.error(err));
}

bootstrap();
