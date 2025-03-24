import { Injectable } from '@angular/core';
import { CommentRequest } from './types/commentRequest';
import { BookInterface } from '../book/types/book';
import { BookResponseInterface } from '../book/types/addBookResponse';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { BookService } from '../book/book.service';
import { HttpClient } from '@angular/common/http';
import { CommentInterface } from './types/commentInterface';
import { CommentResponseInterface } from './types/commentResponse';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private bookService: BookService, private http: HttpClient) {}

  commentBook(
    bookId: string | null,
    userId: String | undefined,
    username: String | undefined,
    comment: CommentRequest
  ): Observable<BookInterface> {
    return this.http
      .put<BookResponseInterface>(`${environment.apiUrl}/comments/new`, {
        bookId,
        userId,
        username,
        comment,
      })
      .pipe(map(this.bookService.getBook));
  }

  getSingleComment(commentId: string | null): Observable<CommentInterface> {
    return this.http.get<CommentInterface>(
      `${environment.apiUrl}/comments/${commentId}`
    );
  }

  editComment(
    commentId: string | null,
    comment: CommentRequest
  ): Observable<CommentInterface> {
    const fullUrl = `${environment.apiUrl}/comments/${commentId}/edit`;

    return this.http
      .put<CommentResponseInterface>(fullUrl, comment)
      .pipe(map(this.getComment));
  }

  getComment(response: CommentResponseInterface): CommentInterface {
    return response.comment;
  }

  deleteComment(commentId: string | null) {
    return this.http.get(`${environment.apiUrl}/comments/${commentId}/delete`);
  }

  likeComment(commentId: string | undefined, userId: String | undefined) {
    return this.http.post(`${environment.apiUrl}/comments/${commentId}/like`, {
      commentId,
      userId,
    });
  }

  dislikeComment(commentId: string | undefined, userId: String | undefined) {
    return this.http.post(
      `${environment.apiUrl}/comments/${commentId}/dislike`,
      {
        commentId,
        userId,
      }
    );
  }
}
