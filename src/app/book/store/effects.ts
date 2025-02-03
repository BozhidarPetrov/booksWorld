import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../book.service';
import { bookAction } from './actions';
import { BookInterface } from '../types/book';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookFromMongoose } from '../components/types/bookFromMongoose';

export const createBookEffect = createEffect(
  (actions$ = inject(Actions), bookService = inject(BookService)) => {
    return actions$.pipe(
      ofType(bookAction.createBook),
      switchMap(({ request }) => {
        return bookService.addBook(request).pipe(
          map((book: BookInterface) => {
            return bookAction.createBookSuccess({ book });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              bookAction.createBookFailure({
                error: error.error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(bookAction.createBookSuccess),
      tap(({ book }) => {
        router.navigate(['/books/all']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const getBookEffect = createEffect(
  (actions$ = inject(Actions), bookService = inject(BookService)) => {
    return actions$.pipe(
      ofType(bookAction.getBook),
      switchMap(({ bookId }) => {
        return bookService.getSingleBook(bookId).pipe(
          map((book: BookFromMongoose) => {
            return bookAction.getBookSuccess({ book });
          }),
          catchError((err) => {
            console.log(err);

            return of(bookAction.getBookFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const likeBookEffect = createEffect(
  (actions$ = inject(Actions), bookService = inject(BookService)) => {
    return actions$.pipe(
      ofType(bookAction.likeBook),
      switchMap(({ bookId, userId }) => {
        return bookService.likeBook(bookId, userId).pipe(
          map(() => {
            return bookAction.likeBookSuccess();
          }),
          catchError((err) => {
            console.log(err);

            return of(bookAction.likeBookFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteBookEffect = createEffect(
  (actions$ = inject(Actions), bookService = inject(BookService)) => {
    return actions$.pipe(
      ofType(bookAction.deleteBook),
      switchMap(({ bookId }) => {
        return bookService.deleteBook(bookId).pipe(
          map(() => {
            return bookAction.deleteBookSuccess();
          }),
          catchError(() => {
            return of(bookAction.deleteBookFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(bookAction.deleteBookSuccess),
      tap(() => {
        router.navigate(['/books/all']);      })
    );
  },
  { functional: true, dispatch: false }
);
