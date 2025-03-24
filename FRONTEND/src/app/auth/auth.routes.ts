import { Route } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserGuard } from '../shared/guards/userGuard';

export const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [UserGuard],
  },
];

export const loginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UserGuard],
  },
];
