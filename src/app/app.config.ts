import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from '../app/auth/store/effects';
import * as bookEffects from '../app/book/store/effects';
import * as commentEffects from '../app/comment/store/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthService } from './auth/auth-service.service';
import { authInterceptor } from './shared/services/auth.interceptor';
import { bookFeatureKey, bookReducer } from './book/store/reducers';
import { commentFeatureKey, commentReducer } from './comment/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(bookFeatureKey, bookReducer),
    provideState(commentFeatureKey, commentReducer),
    provideEffects(authEffects, bookEffects, commentEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideRouterStore(),
    AuthService
  ],
};
