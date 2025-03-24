import { CommentInterface } from './commentInterface';

export interface CommentStateInterface {
  isSubmitting: boolean;
  validationErrors: string | null;
  data: CommentInterface | null;
}
