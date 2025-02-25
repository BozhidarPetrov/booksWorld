import { Injectable } from '@angular/core';
import { CommentRequest } from './types/commentRequest';
import { BookInterface } from '../book/types/book';
import { BookResponseInterface } from '../book/types/addBookResponse';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { BookService } from '../book/book.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private bookService: BookService, private http:HttpClient) { }


  commentBook(
    bookId: string | null,
    userId: String | undefined,
    username: String | undefined,
    comment: CommentRequest
  ): Observable<BookInterface> {
    return this.http
      .put<BookResponseInterface>(
        `${environment.apiUrl}/comments/new`,
        {
          bookId,
          userId,
          username,
          comment,
        }
      )
      .pipe(map(this.bookService.getBook));
  }
}
