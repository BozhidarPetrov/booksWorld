import { Route } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';

export const createBookRoutes: Route[] = [
  {
    path: '',
    component: CreateComponent,
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
  },
];
