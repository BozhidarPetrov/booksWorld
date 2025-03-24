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
import { commentAction } from '../../../comment/store/actions';

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
    @Inject(MAT_DIALOG_DATA)
    public data: { bookId: string; page: string; commentId: string },
    private router: Router
  ) {}

  readonly dialogRef = inject(MatDialogRef<ConformationDialogComponent>);

  onDeleteBook: boolean = this.data.page === 'deleteBook' ? true : false;
  onEditBook: boolean = this.data.page === 'editBook' ? true : false;
  onDeleteComment: boolean = this.data.page === 'deleteComment' ? true : false;
  onEditComment: boolean = this.data.page === 'editComment' ? true : false;
  onLogout: boolean = this.data.page === 'logout' ? true : false;

  deleteBook(): void {
    this.store.dispatch(bookAction.deleteBook({ bookId: this.data.bookId }));
  }

  editBook() {
    this.router.navigate(['/books', this.data.bookId, 'edit']);
  }

  deleteComment() {
    this.store.dispatch(
      commentAction.deleteComment({ commentId: this.data.commentId })
    );
  }

  editComment() {
    this.router.navigate(['/comments', this.data.commentId, 'edit']);
  }

  logout() {
    this.store.dispatch(authActions.logout());
    this.http.get('http://localhost:5000/api/users/logout').subscribe();
  }

  clickNo(): void {
    console.log('You have clicked NO!');
  }
}
