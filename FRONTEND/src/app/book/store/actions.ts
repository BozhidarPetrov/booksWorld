import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookRequestInterface } from '../types/addBookRequest';
import { BookInterface } from '../types/book';
import { BookFromMongoose } from '../types/bookFromMongoose';

export const bookAction = createActionGroup({
  source: 'Book',
  events: {
    'Create book': props<{ request: BookRequestInterface }>(),
    'Create book success': props<{ book: BookInterface }>(),
    'Create book failure': props<{ error: string }>(),

    'Get book': props<{ bookId: string | null }>(),
    'Get book success': props<{ book: BookFromMongoose }>(),
    'Get book failure': emptyProps(),

    'Like book': props<{ bookId: string | null; userId: String | undefined }>(),
    'Like book success': emptyProps(),
    'Like book failure': emptyProps(),

    'Dislike book': props<{
      bookId: string | null;
      userId: String | undefined;
    }>(),
    'Dislike book success': emptyProps(),
    'Dislike book failure': emptyProps(),

    'Delete book': props<{ bookId: string | null }>(),
    'Delete book success': emptyProps(),
    'Delete book failure': emptyProps(),

    'Edit book': props<{
      bookId: string | null;
      request: BookRequestInterface;
    }>(),
    'Edit book success': props<{ book: BookInterface }>(),
    'Edit book failure': props<{ error: string }>(),
  },
});
