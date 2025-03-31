import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookFromMongoose } from '../../types/bookFromMongoose';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookCardSmallComponent } from '../book-card-small/book-card-small.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, BookCardSmallComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  searchText: string = '';
  allBooks: BookFromMongoose[] = [];
  filteredBooks: BookFromMongoose[] = [];

  ngOnInit(): void {
    this.searchText = this.activatedRoute.snapshot.queryParams['searchText'];

    this.http
      .get<BookFromMongoose[]>('http://localhost:5000/api/books/all')
      .subscribe({
        next: (books) => {
          this.allBooks = books;

          console.log('search text', this.searchText);
          this.filteredBooks = this.allBooks.filter((book) =>
            book.title.toLowerCase().includes(this.searchText.toLowerCase())
          );
          console.log('all books', this.allBooks);

          console.log('filtered books', this.filteredBooks);
        },
      });
  }
}
