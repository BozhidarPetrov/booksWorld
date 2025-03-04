import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
import { selectUser } from '../../../auth/store/reducers';

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
    private fb: FormBuilder,
    private router: Router
  ) {}

  bookId: string | null = '';
  isOwner: boolean | undefined;

  data$ = combineLatest({
    user: this.store.select(selectUser),
    book: this.store.select(SelectBookData),
    validationErrors: this.store.select(selectValidationErrors),
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

    if (this.form.valid) {
      this.store.dispatch(
        bookAction.editBook({ bookId: this.bookId, request })
      );
    }
  }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');

    this.store.dispatch(bookAction.getBook({ bookId: this.bookId }));

    this.data$.subscribe({
      next: (data) => {

      
      

        if (data.book) {

          if(data.user?._id !== data.book?.owner._id){
            this.isOwner = false;
          }else{
            this.isOwner = true;
          }


          this.form.setValue({
            title: data.book.title,
            author: data.book.author,
            shortDescription: data.book.shortDescription,
            fullDescription: data.book.fullDescription,
            coverPicture: data.book.coverPicture,
            myOpinion: data.book.myOpinion,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
