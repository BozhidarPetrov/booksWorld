import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { GuestGuard } from './shared/guards/guestGuard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: '404',
    component: NotFoundComponent,
  },

  {
    path: 'user/register',
    loadChildren: () =>
      import('../app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'user/login',
    loadChildren: () =>
      import('../app/auth/auth.routes').then((m) => m.loginRoutes),
  },

  {
    path: 'books/addNew',
    loadChildren: () =>
      import('../app/book/book.routes').then((m) => m.createBookRoutes),
  },

  {
    path: 'books/all',
    loadChildren: () =>
      import('../app/book/book.routes').then((m) => m.allBooksRoutes),
  },

  {
    path: 'books/:bookId/details',
    loadChildren: () =>
      import('../app/book/book.routes').then((m) => m.bookDetailsRoutes),
  },

  {
    path: 'books/:bookId/edit',
    loadChildren: () =>
      import('../app/book/book.routes').then((m) => m.bookEditRoutes),
  },

  {
    path: 'books/:bookId/comment',
    loadChildren: () =>
      import('../app/book/book.routes').then((m) => m.bookCommentRoutes),
  },

  { path: '**', pathMatch: 'full', redirectTo: '/404' },
];
