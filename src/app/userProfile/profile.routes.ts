import { Route } from '@angular/router';
import { GuestGuard } from '../shared/guards/guestGuard';
import { ProfileComponent } from './components/profile/profile.component';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [GuestGuard],
  },
];
