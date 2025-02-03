import { BookFromMongoose } from "../components/types/bookFromMongoose";

export interface BookStateInterface {
  isSubmitting: boolean;
  validationErrors: string | null;
  data : BookFromMongoose| null;
}
