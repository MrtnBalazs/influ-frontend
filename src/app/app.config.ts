
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './service/authentication/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideKeycloak } from 'keycloak-angular'; // import provideKeycloak
import { environment } from '../environments/environment'; // import environment
import { KeycloakOnLoad } from 'keycloak-js'; // import KeycloakOnLoad

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
      config: {
        url: environment.keycloak.config.url,
        realm: environment.keycloak.config.realm,
        clientId: environment.keycloak.config.clientId
      },
      initOptions: {
        onLoad: environment.keycloak.initOptions.onLoad as KeycloakOnLoad,
        checkLoginIframe: environment.keycloak.initOptions.checkLoginIframe
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    //provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    //provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations()],
};