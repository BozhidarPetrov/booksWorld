import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { bookAction } from '../../../book/store/actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { authActions } from '../../../auth/store/actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conformation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conformation-dialog.html',
  styleUrl: './conformation-dialog.css',
})
export class ConformationDialogComponent {
  constructor(
    private store: Store,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string; page: string },
    private router: Router
  ) {}

  readonly dialogRef = inject(MatDialogRef<ConformationDialogComponent>);

  onDelete: boolean = this.data.page === 'delete' ? true : false;
  onEdit: boolean = this.data.page === 'edit' ? true : false;
  onLogout: boolean = this.data.page === 'logout' ? true : false;

  delete(): void {
    this.store.dispatch(bookAction.deleteBook({ bookId: this.data.bookId }));
  }

  edit() {
    this.router.navigate(['/books', this.data.bookId, 'edit']);
  }

  logout() {
    this.store.dispatch(authActions.logout());
    this.http.get('http://localhost:5000/api/users/logout').subscribe();
  }

  clickNo(): void {
    console.log('You have clicked NO!');
  }
}
