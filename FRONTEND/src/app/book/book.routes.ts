import { Route } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { GuestGuard } from '../shared/guards/guestGuard';
import { CommentComponent } from '../comment/components/comment/comment.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

export const createBookRoutes: Route[] = [
  {
    path: '',
    component: CreateComponent,
    canActivate: [GuestGuard],
  },
];

export const allBooksRoutes: Route[] = [
  {
    path: '',
    component: AllBooksComponent,
  },
];

export const bookDetailsRoutes: Route[] = [
  {
    path: '',
    component: DetailsComponent,
  },
];

export const bookEditRoutes: Route[] = [
  {
    path: '',
    component: EditComponent,
    canActivate: [GuestGuard],
  },
];

export const bookCommentRoutes: Route[] = [
  {
    path: '',
    component: CommentComponent,
    canActivate: [GuestGuard],
  },
];

export const searchResultsRoutes: Route[] = [
  {
    path: '',
    component: SearchResultsComponent,
  },
];