import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookFromMongoose } from '../../types/bookFromMongoose';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookCardSmallComponent } from '../book-card-small/book-card-small.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, BookCardSmallComponent, ReactiveFormsModule],
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
  hasSearched: boolean = false;

  search(): void {
 
      this.searchText = this.form.getRawValue().searchText;

      if(this.searchText === ''){
        return;
      }

      this.filteredBooks = this.allBooks.filter((book) =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.hasSearched = true;
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
