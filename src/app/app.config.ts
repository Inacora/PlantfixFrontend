import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http'; 

import { routes } from './app.routes';
import { errInteInterceptor } from './_/helper/err-inte.interceptor'; 
import { HttpTokenInterceptorInterceptor } from './_/helper/http-token.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      // withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }), 
      withInterceptors([errInteInterceptor, HttpTokenInterceptorInterceptor]), 
    ) 
  ]
};
