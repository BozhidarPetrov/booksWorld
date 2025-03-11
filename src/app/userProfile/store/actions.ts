import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../../auth/types/registerRequest';
import { MongooseUserInterface } from '../../shared/types/mongooseUser';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Edit Profile': props<{ request: RegisterRequestInterface }>(),
    'Edit Profile Success': props<{ currentUser: MongooseUserInterface }>(),
    'Edit Profile Failure': props<{ error: string }>(),
  },
});
