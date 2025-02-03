import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { bookAction } from '../../store/actions';
import { combineLatest } from 'rxjs';
import { SelectBookData, selectValidationErrors } from '../../store/reducers';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BookRequestInterface } from '../../types/addBookRequest';
import { ErrorComponent } from '../../../shared/components/error/error.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ErrorComponent, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder
  ) {}

  bookId: string | null = '';

  data$ = combineLatest({
    book: this.store.select(SelectBookData),
    validationErrors: this.store.select(selectValidationErrors), //edit the selctor with EDIT ERRORS
  });

  form = this.fb.nonNullable.group({
    title: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    author: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(30)],
    ],
    shortDescription: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
      ],
    ],
    fullDescription: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ],
    ],
    coverPicture: [
      '',
      [Validators.required, this.coverImageValidator('image')],
    ],
    myOpinion: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ],
    ],
  });

  coverImageValidator(imageUrl: string): ValidatorFn {
    const pattern = /^https?:\/\/(.+)$/;

    return (control) => {
      return control.value === '' || pattern.test(control.value)
        ? null
        : { coverImageValidator: true };
    };
  }

  onSubmit(): void {
    const request: BookRequestInterface = this.form.getRawValue();

    console.log(request);

    // this.store.dispatch(bookAction.createBook({ request }));
  }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');

    this.store.dispatch(bookAction.getBook({ bookId: this.bookId }));

    this.data$.subscribe({
      next: (data) => {
        if (data.book?.title) {
          this.form.get('title')?.setValue(data.book.title);
        }

        if (data.book?.author) {
          this.form.get('author')?.setValue(data.book.author);
        }

        if (data.book?.shortDescription) {
          this.form
            .get('shortDescription')
            ?.setValue(data.book.shortDescription);
        }

        if (data.book?.fullDescription) {
          this.form.get('fullDescription')?.setValue(data.book.fullDescription);
        }

        if (data.book?.coverPicture) {
          this.form.get('coverPicture')?.setValue(data.book.coverPicture);
        }

        if (data.book?.myOpinion) {
          this.form.get('myOpinion')?.setValue(data.book.myOpinion);
        }
      },
      error: (err) => {},
    });
  }
}
