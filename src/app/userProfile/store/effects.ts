import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MongooseUserInterface } from '../../shared/types/mongooseUser';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { profileActions } from './actions';
import { Store } from '@ngrx/store';
import { authActions } from '../../auth/store/actions';

export const editProfileEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.editProfile),
      switchMap(({ request }) => {
        return profileService.editProfile(request).pipe(
          map((currentUser: MongooseUserInterface) => {
            return profileActions.editProfileSuccess({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error);

            return of(
              profileActions.editProfileFailure({
                error: error.error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAftereditProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(profileActions.editProfileSuccess),
      tap(() => {
        store.dispatch(authActions.logout());
      })
    );
  },
  { functional: true, dispatch: false }
);
