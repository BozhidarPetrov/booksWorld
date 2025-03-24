export interface CommentResponseInterface {
  comment: {
    text: string;
    bookID: string;
    author: string;
    username: string;
    createdAt: string;
    likes: [];
    _id: string;
    _v: string;
  };
}
