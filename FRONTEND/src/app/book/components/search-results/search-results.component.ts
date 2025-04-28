import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookFromMongoose } from '../../types/bookFromMongoose';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookCardSmallComponent } from '../book-card-small/book-card-small.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, BookCardSmallComponent, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  form = this.fb.nonNullable.group({
    searchText: '',
  });

  searchText: string = '';
  allBooks: BookFromMongoose[] = [];
  filteredBooks: BookFromMongoose[] = [];
  filteredBooksPerPage: BookFromMongoose[] = [];
  hasSearched: boolean = false;
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

  search(): void {

    this.filteredBooks = [];
 
      this.searchText = this.form.getRawValue().searchText;

      if(this.searchText === ''){
        return;
      }

      this.filteredBooks = this.allBooks.filter((book) =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.hasSearched = true;
      this.fillBooksOfGivenPageArr() 
    }
  

  ngOnInit(): void {
    this.http
      .get<BookFromMongoose[]>('http://localhost:5000/api/books/all')
      .subscribe({
        next: (books) => {
          this.allBooks = books;
        },
      });
  }
}
