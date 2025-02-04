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

@Component({
  selector: 'app-deletion-conformation',
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
  templateUrl: './deletion-conformation.html',
  styleUrl: './deletion-conformation.css',
})
export class DeletionConformationComponent {
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string; page: string },
    private router: Router
  ) {}

  readonly dialogRef = inject(MatDialogRef<DeletionConformationComponent>);

  onDelete: boolean = this.data.page === 'delete' ? true : false;
  onEdit: boolean = this.data.page === 'edit' ? true : false;

  delete(): void {
    this.store.dispatch(bookAction.deleteBook({ bookId: this.data.bookId }));
  }

  edit() {
    this.router.navigate(['/books', this.data.bookId, 'edit']);
  }

  clickNo(): void {
    console.log('You have clicked NO!');
  }
}
