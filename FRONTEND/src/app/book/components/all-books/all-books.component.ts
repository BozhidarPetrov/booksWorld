import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookFromMongoose } from '../../types/bookFromMongoose';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent, MatPaginatorModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css',
})
@Injectable()
export class AllBooksComponent implements OnInit {
  constructor(private http: HttpClient) {}

  startIndex: number | undefined;
  endIndex: number | undefined;

  allBooks: BookFromMongoose[] = [];
  booksOfGivenPage: BookFromMongoose[] = [];

  currentPage = 0;
  handlePageEvent(pageEvent: PageEvent) {
    console.log('handlePageEvent', pageEvent);
    this.currentPage = pageEvent.pageIndex;
    this.fillBooksOfGivenPageArr();
  }

  fillBooksOfGivenPageArr() {
    if (this.currentPage === 0) {
      this.booksOfGivenPage = this.allBooks.slice(0, 4); //This logic is based on a grid with 1 row and 4 cells on it, showing 1-4 items per page
    } else {
      this.startIndex = this.currentPage * 4; //This logic is based on up to 4 items per page, in this particular case this will be a fixed number, due to styling reasons
      this.endIndex = (this.currentPage + 1) * 4 - 1; //This logic is based on up to 4 items per page, in this particular case this will be a fixed number, due to styling reasons

      this.booksOfGivenPage = this.allBooks.slice(
        this.startIndex,
        this.endIndex + 1
      );
    }
  }

  ngOnInit(): void {
    this.http
      .get<BookFromMongoose[]>('http://localhost:5000/api/books/all')
      .subscribe({
        next: (books) => {
          this.allBooks = books;
          this.fillBooksOfGivenPageArr();
        },
        error: (err) => {
          console.log(`Error: ${err}`);
        },
      });
  }
}
