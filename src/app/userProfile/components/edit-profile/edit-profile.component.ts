import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { combineLatest } from 'rxjs';
import {
  selectUser,
  selectValidationErrors,
} from '../../../auth/store/reducers';
import { RegisterRequestInterface } from '../../../auth/types/registerRequest';
import { profileActions } from '../../store/actions';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, this.emailValidator('email')]],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
    ],
    rePassword: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
    ],
  });

  emailValidator(email: string): ValidatorFn {
    const pattern = /^[a-zA-Z0-9\.\_]{6,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/;

    return (control) => {
      return control.value === '' || pattern.test(control.value)
        ? null
        : { emailValidator: true };
    };
  }

  data$ = combineLatest({
    user: this.store.select(selectUser),
    backendErrors: this.store.select(selectValidationErrors), //change to profile store
  });

  onSubmit(): void {
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const rePassword = this.form.get('rePassword')?.value;

    if (!this.form.invalid && username && email && password && rePassword) {
      if (password !== rePassword) {
        return;
      }

      const request: RegisterRequestInterface = {
        username,
        email,
        password,
      };

      this.store.dispatch(profileActions.editProfile({ request }));
    }
  }

  ngOnInit(): void {
    this.data$.subscribe({
      next: (data) => {
        if (data.user) {
          this.form.setValue({
            username: data.user?.username.toString(),
            email: data.user?.email.toString(),
            password: '',
            rePassword: '',
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
