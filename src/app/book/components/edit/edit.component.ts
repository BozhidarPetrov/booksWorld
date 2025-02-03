import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { bookAction } from '../../store/actions';
import { combineLatest } from 'rxjs';
import { SelectBookData } from '../../store/reducers';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  bookId: string | null = '';

  data$ = combineLatest({
    book: this.store.select(SelectBookData),
  });

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');

    this.store.dispatch(bookAction.getBook({ bookId: this.bookId }));
  }
}
