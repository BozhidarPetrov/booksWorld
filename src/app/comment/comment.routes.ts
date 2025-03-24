import { Route } from '@angular/router';
import { GuestGuard } from '../shared/guards/guestGuard';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';

export const editCommentRoutes: Route[] = [
  {
    path: '',
    component: EditCommentComponent,
    canActivate: [GuestGuard],
  },
];
