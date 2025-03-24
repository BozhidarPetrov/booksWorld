import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsSubmitting,
  selectUser,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/error/error.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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

  //  passwordValidator(password: string , rePassword: string ) {
  //   return password.trim() === rePassword.trim();
  //  }

  data$ = combineLatest({
    user: this.store.select(selectUser),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoggedIn: this.store.select(selectIsLoggedIn),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const rePassword = this.form.get('rePassword')?.value;

    if (this.form.valid && username && email && password && rePassword) {
      if (password !== rePassword) {
        return;
      }

      const request: RegisterRequestInterface = {
        username,
        email,
        password,
      };

      this.store.dispatch(authActions.register({ request }));
    }
  }
}
