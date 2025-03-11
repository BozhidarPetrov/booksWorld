import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MongooseUserInterface } from '../../shared/types/mongooseUser';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { profileActions } from './actions';

export const editProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    profileService = inject(ProfileService),
  ) => {
    return actions$.pipe(
      ofType(profileActions.editProfile),
      switchMap(({ request }) => {
        return profileService.editProfile(request).pipe(
          map((currentUser: MongooseUserInterface) => {
            return profileActions.editProfileSuccess({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
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
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(profileActions.editProfileSuccess),
      tap(() => {
        router.navigateByUrl('/user/profile');
      })
    );
  },
  { functional: true, dispatch: false }
);