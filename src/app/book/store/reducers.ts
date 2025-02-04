import { createFeature, createReducer, on } from '@ngrx/store';
import { BookStateInterface } from '../types/bookState';
import { bookAction } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: BookStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  data: null,
};

const bookFeature = createFeature({
  name: 'Book',
  reducer: createReducer(
    initialState,
    on(bookAction.createBook, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(bookAction.createBookSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(bookAction.createBookFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),
    on(bookAction.getBook, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(bookAction.getBookSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.book,
    })),
    on(bookAction.getBookFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(bookAction.deleteBook, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(bookAction.deleteBookSuccess, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(bookAction.deleteBookFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(bookAction.editBook, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(bookAction.editBookSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(bookAction.editBookFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: bookFeatureKey,
  reducer: bookReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectData: SelectBookData,
} = bookFeature;
