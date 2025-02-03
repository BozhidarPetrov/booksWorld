import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsSubmitting,
  selectUser,
  selectValidationErrors,
} from '../../../auth/store/reducers';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private store: Store) {}

  data$ = combineLatest({
    user: this.store.select(selectUser),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoggedIn: this.store.select(selectIsLoggedIn),
  });
}
