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

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent implements OnInit {
  @Input() comment: CommentInterface | undefined;

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

  ngOnInit(): void {
    const dateFromMongoArr = this.comment?.createdAt.split('T');

    if (dateFromMongoArr) {
      const date = dateFromMongoArr[0];
      const time = dateFromMongoArr[1]?.slice(0, 8);

      this.commentDate = `${date} / ${time}`;
    }
  }
}
