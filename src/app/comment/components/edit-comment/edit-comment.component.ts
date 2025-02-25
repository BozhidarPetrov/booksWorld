import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommentRequest } from '../../types/commentRequest';
import { commentAction } from '../../store/actions';
import { combineLatest } from 'rxjs';
import { SelectCommentData } from '../../store/reducers';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css',
})
export class EditCommentComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  commentId: string | null = '';

  data$ = combineLatest({
    comment: this.store.select(SelectCommentData),
  });

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
        commentAction.editComment({
          commentId: this.commentId,
          comment,
        })
      );
    }
  }

  clearForm(): void {
    this.form.reset();
  }

  ngOnInit(): void {
    this.commentId = this.activatedRoute.snapshot.paramMap.get('commentId');

    this.store.dispatch(
      commentAction.getComment({ commentId: this.commentId })
    );

    this.data$.subscribe({
      next: (data) => {
        if (data.comment) {
          this.form.setValue({
            text: data.comment.text,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
