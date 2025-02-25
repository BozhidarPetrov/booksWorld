import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CommentService } from "../comment.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { commentAction } from "./actions";
import { BookInterface } from "../../book/types/book";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

export const commentBookEffect = createEffect(
    (actions$ = inject(Actions), commentService = inject(CommentService)) => {
      return actions$.pipe(
        ofType(commentAction.commentBook),
        switchMap(({ bookId, userId, username,  comment }) => {
          
          return commentService.commentBook(bookId, userId, username, comment).pipe(
            map((book: BookInterface) => {
              return commentAction.commentBookSuccess({ book });
            }),
            catchError((error: HttpErrorResponse) => {
              console.log(error.error.message);
  
              return of(commentAction.commentBookFailure());
            })
          );
        })
      );
    },
    { functional: true }
  );
  
  export const redirectAfterCommentEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(commentAction.commentBookSuccess),
        tap(({ book }) => {
          router.navigate(['/books', book._id, 'details']);
        })
      );
    },
    { functional: true, dispatch: false }
  );