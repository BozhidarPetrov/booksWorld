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
import { MongooseUserInterface } from '../../../shared/types/mongooseUser';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommentInterface } from '../../../comment/types/commentInterface';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatButtonModule,
    CommentCardComponent,
    MatPaginatorModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  username: String | undefined = '';
  userId: String | undefined = '';
  isLoggedIn: boolean = false;
  hasLiked: boolean = false;
  isOwner: boolean = false;
  bookId: string | null = '';
  likesCounter: number | undefined = 0;
  likedFrom: String[] = [];

  commentsArr: CommentInterface[] = [];
  commentsPaginated: CommentInterface[] = [];

  currentPage = 0;
  handlePageEvent(pageEvent: PageEvent) {
    console.log('handlePageEvent', pageEvent);
    this.currentPage = pageEvent.pageIndex;
    this.fillCommentsPaginatedArr();
  }

  fillCommentsPaginatedArr() {
    if (this.currentPage === 0) {
      this.commentsPaginated = this.commentsArr.slice(0, 1); //This logic is based on a grid with 1 row and 1 cell on it, showing 1 item per page
    } else {
      this.commentsPaginated = this.commentsArr.slice(
        this.currentPage,
        this.currentPage + 1
      );
    }
  }

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

    if (this.username) {
      this.likedFrom.push(this.username);
    }

    if (this.likesCounter !== undefined) {
      this.likesCounter++;
    }
  }

  dislike(): void {
    this.store.dispatch(
      bookAction.dislikeBook({ bookId: this.bookId, userId: this.userId })
    );
    this.hasLiked = false;
    this.likedFrom.pop();

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
        this.username = data?.user?.username;

        if (data.book?.comments) {
          this.commentsArr = data.book?.comments;
          this.fillCommentsPaginatedArr();
        }

        this.likedFrom = [];
        if (data.book?.likes) {
          for (let like of data.book?.likes) {
            let likeTemp: MongooseUserInterface = like;
            this.likedFrom.push(likeTemp.username);
          }
        }

        this.likesCounter = data.book?.likes.length;
        if (this.userId) {
          const likesArr: MongooseUserInterface[] | undefined =
            data?.book?.likes;

          if (likesArr) {
            for (let user of likesArr) {
              if (user._id === this.userId.toString()) {
                this.hasLiked = true;
              }
            }
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
