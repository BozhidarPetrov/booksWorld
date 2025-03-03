import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';
import { commentAction } from './actions';
import { CommentStateInterface } from '../types/commentState';

const initialState: CommentStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  data: null,
};

const commentFeature = createFeature({
  name: 'Comment',
  reducer: createReducer(
    initialState,
    on(commentAction.commentBook, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(commentAction.commentBookSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(commentAction.commentBookFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(commentAction.getComment, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(commentAction.getCommentSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.comment,
    })),
    on(commentAction.getCommentFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(commentAction.editComment, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(commentAction.editCommentSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(commentAction.editCommentFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),
    on(commentAction.deleteComment, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(commentAction.deleteCommentSuccess, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(commentAction.deleteCommentFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: commentFeatureKey,
  reducer: commentReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectData: SelectCommentData,
} = commentFeature;
