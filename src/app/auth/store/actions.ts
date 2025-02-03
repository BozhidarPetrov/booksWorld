import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest';
import { MongooseUserInterface } from '../../shared/types/mongooseUser';
import { LoginRequestInterface } from '../types/loginRequest';


export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: MongooseUserInterface }>(),
    'Register Failure': props<{ error: string }>(), // 'Register Failure': props<{ errors: BackendErrorsInterface }>(),

      Login: props<{ request: LoginRequestInterface }>(),
      'Login Success': props<{ currentUser: MongooseUserInterface }>(),
      'Login Failure': props<{ error: string }>(),


    //   'Update current user': props<{
    //     currentUserRequest: CurrentUserRequestInterface;
    //   }>(),
    //   'Update current user success': props<{ currentUser: CurrentUser }>(),
    //   'Update current user failure': props<{ errors: BackendErrorsInterface }>(),

      Logout: emptyProps(),
  },
});
