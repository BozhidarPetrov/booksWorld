import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginRequestInterface } from '../../types/loginRequest';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import { selectIsLoading, selectIsSubmitting, selectUser, selectValidationErrors } from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/error/error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private store: Store) {}

    data$ = combineLatest({
      user: this.store.select(selectUser),
      isLoading: this.store.select(selectIsLoading),
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    if (email && password) {
      const request: LoginRequestInterface = {
        email,
        password,
      };

      this.store.dispatch(authActions.login({ request }));
    }
  }
}
