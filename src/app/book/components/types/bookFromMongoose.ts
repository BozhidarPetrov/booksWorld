import { BookOwner } from './bookOwner';

export interface BookFromMongoose {
  author: string;
  coverPicture: string;
  createdAt: string;
  fullDescription: string;
  likes: [];
  myOpinion: string;
  owner: BookOwner;
  shortDescription: string;
  title: string;
  __v: number;
  _id: string;
}
