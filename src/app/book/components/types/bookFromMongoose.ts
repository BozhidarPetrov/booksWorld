import { CommentInterface } from '../../types/commentInterface';
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
  comments: CommentInterface[];
  __v: number;
  _id: string;
}
