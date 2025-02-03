import { MongooseUserInterface } from "../../shared/types/mongooseUser";


export interface AuthStateInterface {
  isSubmitting: boolean;
  isLoggedIn: boolean;
  user: MongooseUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: string | null;
}
