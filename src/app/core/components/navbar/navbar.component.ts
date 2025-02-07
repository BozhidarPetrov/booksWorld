import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../../auth/store/actions';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsSubmitting,
  selectUser,
  selectValidationErrors,
} from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConformationDialogComponent } from '../../../shared/components/conformation-dialog/conformation-dialog';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);

  data$ = combineLatest({
    user: this.store.select(selectUser),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoggedIn: this.store.select(selectIsLoggedIn),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private http: HttpClient
  ) {}

  form = this.fb.nonNullable.group({
    searchText: '',
  });

  onSubmit(): void {
    console.log(this.form.getRawValue());
  }

  openDialogLogout(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConformationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        page: 'logout',
      },
    });
  }
}
