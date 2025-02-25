import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookInterface } from '../../book/types/book';
import { CommentRequest } from '../types/commentRequest';
import { CommentInterface } from '../types/commentInterface';
import { CommentResponseInterface } from '../types/commentResponse';

export const commentAction = createActionGroup({
  source: 'Comment',
  events: {
    'Comment book': props<{
      bookId: string | null;
      userId: String | undefined;
      username: String | undefined;
      comment: CommentRequest;
    }>(),
    'Comment book success': props<{ book: BookInterface }>(),
    'Comment book failure': emptyProps(),

    'Get comment': props<{ commentId: string | null }>(),
    'Get comment success': props<{ comment: CommentInterface }>(),
    'Get comment failure': emptyProps(),

    'Edit comment': props<{
      commentId: string | null;
      comment: CommentRequest;
    }>(),
    'Edit comment success': props<{ comment: CommentInterface }>(),
    'Edit comment failure': props<{ error: string }>(),
  },
});
