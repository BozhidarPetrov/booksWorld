import { Component, Input, OnInit } from '@angular/core';
import { CommentInterface } from '../../types/commentInterface';
import { RouterLink } from '@angular/router';
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
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectIsLoggedIn, selectUser } from '../../../auth/store/reducers';
import { commentAction } from '../../store/actions';
import { MongooseUserInterface } from '../../../shared/types/mongooseUser';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent implements OnInit {
  constructor(private store: Store) {}

  @Input() comment: CommentInterface | undefined;

  data$ = combineLatest({
    isLoggedIn: this.store.select(selectIsLoggedIn),
    user: this.store.select(selectUser),
  });

  username: String | undefined = '';
  userId: String | undefined = '';
  isLoggedIn: boolean = false;
  hasLiked: boolean = false;
  isOwner: boolean = false;
  commentId: string | undefined = '';
  likesCounter: number | undefined = 0;
  likedFrom: String[] = [];
  commentDate: string | undefined = '';
  readonly dialog = inject(MatDialog);

  openDialogEditComment(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConformationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        commentId: this.comment?._id,
        page: 'editComment',
      },
    });
  }

  openDialogDeleteComment(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ConformationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        commentId: this.comment?._id,
        page: 'deleteComment',
      },
    });
  }

  like(): void {
    this.store.dispatch(
      commentAction.likeComment({
        commentId: this.commentId,
        userId: this.userId,
      })
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
      commentAction.dislikeComment({
        commentId: this.commentId,
        userId: this.userId,
      })
    );
    this.hasLiked = false;
    this.likedFrom.pop();

    if (this.likesCounter !== undefined) {
      this.likesCounter--;
    }
  }

  ngOnInit(): void {
    this.likedFrom = [];
    if (this.comment?.likes) {
      for (let like of this.comment?.likes) {
        let likeTemp: MongooseUserInterface = like;
        this.likedFrom.push(likeTemp.username);
      }
    }

    const dateFromMongoArr = this.comment?.createdAt.split('T');

    if (dateFromMongoArr) {
      const date = dateFromMongoArr[0];
      const time = dateFromMongoArr[1]?.slice(0, 8);

      this.commentDate = `${date} / ${time}`;
    }

    this.commentId = this.comment?._id;

    this.data$.subscribe({
      next: (data) => {
        this.userId = data?.user?._id;
        this.username = data?.user?.username;

        this.likesCounter = this.comment?.likes.length;
        if (this.userId) {
          // const likesArr: string[] | undefined = this.comment?.likes;
          const likesArr: MongooseUserInterface[] | undefined =
            this.comment?.likes;

          // if (likesArr?.includes(this.userId.toString())) {
          //   this.hasLiked = true;
          // }

          if (likesArr) {
            for (let user of likesArr) {
              if (user._id === this.userId.toString()) {
                this.hasLiked = true;
              }
            }
          }

          if (this.comment?.author === this.userId) {
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
