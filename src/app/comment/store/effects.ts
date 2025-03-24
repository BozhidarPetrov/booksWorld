import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentService } from '../comment.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { commentAction } from './actions';
import { BookInterface } from '../../book/types/book';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommentInterface } from '../types/commentInterface';

export const commentBookEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(commentAction.commentBook),
      switchMap(({ bookId, userId, username, comment }) => {
        return commentService
          .commentBook(bookId, userId, username, comment)
          .pipe(
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

export const getCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(commentAction.getComment),
      switchMap(({ commentId }) => {
        return commentService.getSingleComment(commentId).pipe(
          map((comment: CommentInterface) => {
            return commentAction.getCommentSuccess({ comment });
          }),
          catchError((err) => {
            console.log(err);

            return of(commentAction.getCommentFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const editCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(commentAction.editComment),
      switchMap(({ commentId, comment }) => {
        return commentService.editComment(commentId, comment).pipe(
          map((comment: CommentInterface) => {
            return commentAction.editCommentSuccess({ comment });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              commentAction.editCommentFailure({
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

export const redirectAfterEditEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(commentAction.editCommentSuccess),
      tap(({ comment }) => {
        router.navigate(['/books', comment.bookID, 'details']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const deleteCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(commentAction.deleteComment),
      switchMap(({ commentId }) => {
        return commentService.deleteComment(commentId).pipe(
          map(() => {
            return commentAction.deleteCommentSuccess();
          }),
          catchError(() => {
            return of(commentAction.deleteCommentFailure());
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
      ofType(commentAction.deleteCommentSuccess),
      tap(() => {
        location.reload();
      })
    );
  },
  { functional: true, dispatch: false }
);

export const likeCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(commentAction.likeComment),
      switchMap(({ commentId, userId }) => {
        return commentService.likeComment(commentId, userId).pipe(
          map(() => {
            return commentAction.likeCommentSuccess();
          }),
          catchError((err) => {
            console.log(err);

            return of(commentAction.likeCommentFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const dislikeCommentEffect = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(commentAction.dislikeComment),
      switchMap(({ commentId, userId }) => {
        return commentService.dislikeComment(commentId, userId).pipe(
          map(() => {
            return commentAction.dislikeCommentSuccess();
          }),
          catchError((err) => {
            console.log(err);

            return of(commentAction.dislikeCommentFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
