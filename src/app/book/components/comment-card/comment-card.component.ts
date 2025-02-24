import { Component, Input, OnInit } from '@angular/core';
import { CommentInterface } from '../../types/commentInterface';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent implements OnInit {
  @Input() comment: CommentInterface | undefined;

  commentDate: string | undefined = '';

  ngOnInit(): void {
    const dateFromMongoArr = this.comment?.createdAt.split('T');

    if (dateFromMongoArr) {
      const date = dateFromMongoArr[0];
      const time = dateFromMongoArr[1]?.slice(0, 8);

      this.commentDate = `${date} / ${time}`;
    }
  }
}
