import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
];
