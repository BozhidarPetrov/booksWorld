import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectUser } from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BookCardSmallComponent } from '../../../book/components/book-card-small/book-card-small.component';
import { BookFromMongoose } from '../../../book/types/bookFromMongoose';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    BookCardSmallComponent,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private store: Store, private http: HttpClient) {}

  allBooks: BookFromMongoose[] = [];
  filteredBooks: BookFromMongoose[] = [];
  filteredBooksPerPage: BookFromMongoose[] = [];
  toggleName: string = '';
  userId: String | undefined = '';
  startIndex: number | undefined;
  endIndex: number | undefined;

  currentPage = 0;
  handlePageEvent(pageEvent: PageEvent) {
    console.log('handlePageEvent', pageEvent);
    this.currentPage = pageEvent.pageIndex;
    this.fillBooksOfGivenPageArr();
  }

  fillBooksOfGivenPageArr() {
    if (this.currentPage === 0) {
      this.filteredBooksPerPage = this.filteredBooks.slice(0, 4); //This logic is based on a grid with 1 row and 4 cells on it, showing 1-4 items per page
    } else {
      this.startIndex = this.currentPage * 4; //This logic is based on up to 4 items per page, in this particular case this will be a fixed number, due to styling reasons
      this.endIndex = (this.currentPage + 1) * 4 - 1; //This logic is based on up to 4 items per page, in this particular case this will be a fixed number, due to styling reasons

      this.filteredBooksPerPage = this.filteredBooks.slice(
        this.startIndex,
        this.endIndex + 1
      );
    }
  }

  data$ = combineLatest({
    user: this.store.select(selectUser),
  });

  myBooks(): void {
    this.filteredBooks = this.allBooks.filter(
      (book) => book.owner._id === this.userId
    );
    this.toggleName = 'myBooks';
    this.fillBooksOfGivenPageArr() 
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
    this.fillBooksOfGivenPageArr() 
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
