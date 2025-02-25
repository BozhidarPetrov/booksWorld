import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookFromMongoose } from '../../types/bookFromMongoose';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css',
})
export class AllBooksComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allBooks: BookFromMongoose[] = [];

  ngOnInit(): void {
    this.http
      .get<BookFromMongoose[]>('http://localhost:5000/api/books/all')
      .subscribe((books) => (this.allBooks = books));
  }
}
