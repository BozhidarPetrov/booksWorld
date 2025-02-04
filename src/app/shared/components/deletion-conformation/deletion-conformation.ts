import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  Input,
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

@Component({
  selector: 'app-deletion-conformation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './deletion-conformation.html',
  styleUrl: './deletion-conformation.css',
})
export class DeletionConformationComponent {
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string }
  ) {}

  readonly dialogRef = inject(MatDialogRef<DeletionConformationComponent>);

  clickYes(): void {
    
    this.store.dispatch(bookAction.deleteBook({ bookId: this.data.bookId }));
  }

  clickNo(): void {
    console.log('You have clicked NO!');
  }
}
