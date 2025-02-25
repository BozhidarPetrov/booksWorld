import { BookFromMongoose } from "./bookFromMongoose";

export interface BookStateInterface {
  isSubmitting: boolean;
  validationErrors: string | null;
  data : BookFromMongoose| null;
}
