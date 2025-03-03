import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUser } from '../../../auth/store/reducers';
import { combineLatest } from 'rxjs';
import { bookAction } from '../../store/actions';
import { SelectBookData } from '../../store/reducers';
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
import { CommentCardComponent } from '../../../comment/components/comment-card/comment-card.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule, CommentCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private store: Store, ) {}

  

  userId: String | undefined = '';
  isLoggedIn: boolean = false;
  hasLiked: boolean = false;
  isOwner: boolean = false;
  bookId: string | null = '';
  likesCounter: number | undefined = 0;

  readonly dialog = inject(MatDialog);

  data$ = combineLatest({
    isLoggedIn: this.store.select(selectIsLoggedIn),
    user: this.store.select(selectUser),
    book: this.store.select(SelectBookData),
  });

  openDialogDeleteBook(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConformationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        bookId: this.bookId,
        page: 'deleteBook',
      },
    });
  }

  openDialogEditBook(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConformationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        bookId: this.bookId,
        page: 'editBook',
      },
    });
  }

  like(): void {
    this.store.dispatch(
      bookAction.likeBook({ bookId: this.bookId, userId: this.userId })
    );
    this.hasLiked = true;

    if (this.likesCounter !== undefined) {
      this.likesCounter++;
    }
  }

  dislike(): void {
    this.store.dispatch(
      bookAction.dislikeBook({ bookId: this.bookId, userId: this.userId })
    );
    this.hasLiked = false;

    if (this.likesCounter !== undefined) {
      this.likesCounter--;
    }
  }



  ngOnInit(): void {


    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');

    this.store.dispatch(bookAction.getBook({ bookId: this.bookId }));

    this.data$.subscribe({
      next: (data) => {

        this.userId = data?.user?._id;

        this.likesCounter = data.book?.likes.length;
        if (this.userId) {
          const likesArr: string[] | undefined = data?.book?.likes;

          if (likesArr?.includes(this.userId.toString())) {
            this.hasLiked = true;
          }

          if (data?.book?.owner._id === this.userId) {
            this.isOwner = true;
          }
        }
      },
      error: (err) => {
        console.error(`Error: ${err}`);
      },
    });
  }
}
