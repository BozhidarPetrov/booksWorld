import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookRequestInterface } from './types/addBookRequest';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { BookInterface } from './types/book';
import { BookResponseInterface } from './types/addBookResponse';
import { BookFromMongoose } from './components/types/bookFromMongoose';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBook(response: BookResponseInterface): BookInterface {
    return response.bookFromBackEnd;
  }

  addBook(request: BookRequestInterface): Observable<BookInterface> {
    const url = environment.apiUrl + '/books/add';

    return this.http
      .post<BookResponseInterface>(url, request)
      .pipe(map(this.getBook));
  }

  likeBook(bookId: string | null, userId: String | undefined) {
    return this.http.post(`${environment.apiUrl}/books/${bookId}/like`, {
      bookId,
      userId,
    });
  }

  getSingleBook(bookId: string | null): Observable<BookFromMongoose> {
    return this.http.get<BookFromMongoose>(
      `${environment.apiUrl}/books/${bookId}/details`
    );
  }

  deleteBook(bookId: string | null) {
    return this.http.get(`${environment.apiUrl}/books/${bookId}/delete`);
  }

  editBook(
    bookId: string | null,
    request: BookRequestInterface
  ): Observable<BookInterface> {
    const fullUrl = `${environment.apiUrl}/books/${bookId}/edit`;

    return this.http
      .put<BookResponseInterface>(fullUrl, request)
      .pipe(map(this.getBook));
  }
}
