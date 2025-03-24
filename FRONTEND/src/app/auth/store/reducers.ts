import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState';
import { authActions } from './actions';
import { createRehydrateReducer } from 'ngrx-rehydrate';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  isLoggedIn: false,
  user: undefined,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createRehydrateReducer(
    { key: 'application_state' },
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      isLoading: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      isLoading: false,
      user: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      validationErrors: action.error,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      isLoading: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      isLoggedIn: true,
      user: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      validationErrors: action.error,
    })),

    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    })),

    on(authActions.logout, (state) => ({
      ...state,
      ...initialState,
      user: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
  selectValidationErrors,
} = authFeature;
