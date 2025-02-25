import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { BookInterface } from "../../book/types/book";
import { CommentRequest } from "../types/commentRequest";

export const commentAction = createActionGroup({
  source: 'Comment',
  events: {
    'Comment book': props<{ bookId: string | null  ; userId: String | undefined, username: String | undefined,  comment: CommentRequest  }>(),
    'Comment book success': props<{ book: BookInterface }>(),
    'Comment book failure': emptyProps(),
  },
});