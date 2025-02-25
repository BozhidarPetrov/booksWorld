import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsSubmitting,
  selectUser,
  selectValidationErrors,
} from '../../../auth/store/reducers';
import { combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookCardComponent } from '../../../book/components/book-card/book-card.component';
import { BookFromMongoose } from '../../../book/types/bookFromMongoose';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private http: HttpClient) {}

  allBooks: BookFromMongoose[] = [];

  randomBook: BookFromMongoose | undefined;

  data$ = combineLatest({
    user: this.store.select(selectUser),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoggedIn: this.store.select(selectIsLoggedIn),
  });

  ngOnInit(): void {
    this.http
      .get<BookFromMongoose[]>('http://localhost:5000/api/books/all')
      .subscribe({
        next: (books) => {
          this.allBooks = books;
          let random = Math.floor(Math.random() * this.allBooks.length);
          this.randomBook = this.allBooks[random];
        },
      });
  }
}
