import { MongooseUserInterface } from '../../shared/types/mongooseUser';

export interface RegisterResponseInterface {
  token: string;
  user: MongooseUserInterface;
}
