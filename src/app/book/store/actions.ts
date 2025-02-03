import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookRequestInterface } from '../types/addBookRequest';
import { BookInterface } from '../types/book';
import { BookFromMongoose } from '../components/types/bookFromMongoose';

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

    'Delete book': props<{ bookId: string | null }>(),
    'Delete book success': emptyProps(),
    'Delete book failure': emptyProps(),
  },
});
