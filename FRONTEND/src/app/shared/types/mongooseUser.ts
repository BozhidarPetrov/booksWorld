export interface MongooseUserInterface {
  username: String;
  email: String;
  password: String;
  _id: String;
  __v: Number;
  token: string;
  favoriteBooks: string[];
}
