import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { bookAction } from '../../store/actions';
import { BookRequestInterface } from '../../types/addBookRequest';
import { combineLatest } from 'rxjs';
import { selectValidationErrors } from '../../store/reducers';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorComponent, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(private fb: FormBuilder, private store: Store) {}

  data$ = combineLatest({
    validationErrors: this.store.select(selectValidationErrors)
  }
  )

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

    this.store.dispatch(bookAction.createBook({ request }));
  }
}

