import { Route } from '@angular/router';
import { GuestGuard } from '../shared/guards/guestGuard';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [GuestGuard],
  },
];

export const editProfileRoutes: Route[] = [
  {
    path: '',
    component: EditProfileComponent,
    canActivate: [GuestGuard],
  },
];
