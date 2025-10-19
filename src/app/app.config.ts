
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './service/authentication/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideKeycloakAngular } from './keycloak.config';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { includeBearerTokenInterceptor } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations()],
};