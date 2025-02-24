import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUser } from '../../../auth/store/reducers';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentRequest } from '../../types/commentRequest';
import { bookAction } from '../../store/actions';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  data$ = combineLatest({
    user: this.store.select(selectUser),
  });

  userId: String | undefined = '';
  bookId: string | null = '';
  username: String | undefined = '';


  form = this.fb.nonNullable.group({
    text: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000),
      ],
    ],
  });

  onSubmit(): void {
    const comment: CommentRequest = this.form.getRawValue();

    if (this.form.valid) {
      this.store.dispatch(
        bookAction.commentBook({
          bookId: this.bookId,
          userId: this.userId,
          username: this.username,
          comment,
          
        })
      );
    }
  }

  clearForm(): void {
    this.form.reset();
  }

  ngOnInit(): void {
    this.data$.subscribe({
      next: (data) => {
        this.userId = data?.user?._id;
        this.username = data?.user?.username
      },
      error: (err) => {
        console.error(`Error: ${err}`);
      },
    });

    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
  }
}
