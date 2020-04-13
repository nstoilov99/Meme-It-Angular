import { IUser } from './user';

export interface IMeme {
  _id: string;
  memeTitle: string;
  likes: number;
  imageUrl: string;
  author: IUser;
}

