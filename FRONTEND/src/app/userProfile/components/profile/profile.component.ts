import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectUser } from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BookCardSmallComponent } from '../../../book/components/book-card-small/book-card-small.component';
import { BookFromMongoose } from '../../../book/types/bookFromMongoose';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BookCardSmallComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private store: Store, private http: HttpClient) {}

  allBooks: BookFromMongoose[] = [];
  filteredBooks: BookFromMongoose[] = [];
  toggleName: string = '';
  userId: String | undefined = '';

  data$ = combineLatest({
    user: this.store.select(selectUser),
  });

  myBooks(): void {
    this.filteredBooks = this.allBooks.filter(
      (book) => book.owner._id === this.userId
    );
    this.toggleName = 'myBooks';
  }

  favoriteBooks(): void {
    const id = this.userId?.toString();

    let favoriteBooks: BookFromMongoose[] = [];
    let bookLikesTemp: string[] = [];
    this.allBooks.forEach((book) => {
      bookLikesTemp = book.likes;
      if (id) {
        if (bookLikesTemp.includes(id)) {
          favoriteBooks.push(book);
        }
      }
    });
    this.filteredBooks = favoriteBooks;
    this.toggleName = 'favoriteBooks';
  }

  ngOnInit(): void {
    this.data$.subscribe({
      next: (data) => {
        this.userId = data?.user?._id;
      },
    });

    this.http
      .get<BookFromMongoose[]>('http://localhost:5000/api/books/all')
      .subscribe({
        next: (books) => {
          this.allBooks = books;
        },
      });
  }
}
