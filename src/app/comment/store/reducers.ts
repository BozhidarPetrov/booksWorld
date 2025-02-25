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

 

  
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: commentFeatureKey,
  reducer: commentReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = commentFeature;
