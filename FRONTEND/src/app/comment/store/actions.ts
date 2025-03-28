import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookInterface } from '../../book/types/book';
import { CommentRequest } from '../types/commentRequest';
import { CommentInterface } from '../types/commentInterface';

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

    'Delete comment': props<{ commentId: string | null }>(),
    'Delete comment success': emptyProps(),
    'Delete comment failure': emptyProps(),

    'Like comment': props<{
      commentId: string | undefined;
      userId: String | undefined;
    }>(),
    'Like comment success': emptyProps(),
    'Like comment failure': emptyProps(),

    'Dislike comment': props<{
      commentId: string | undefined;
      userId: String | undefined;
    }>(),
    'Dislike comment success': emptyProps(),
    'Dislike comment failure': emptyProps(),
  },
});
