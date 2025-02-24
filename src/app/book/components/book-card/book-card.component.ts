import { Component, Input } from '@angular/core';
import { BookFromMongoose } from '../types/bookFromMongoose';
import { RouterLink } from '@angular/router';
import { ShortenTextPipe } from '../../../shared/pipes/shorten.pipe';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink, ShortenTextPipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() book: BookFromMongoose = {
    author: '',
    coverPicture: '',
    createdAt: '',
    fullDescription: '',
    likes: [],
    myOpinion: '',
    owner: {
      username: '',
      _id: '',
    },
    comments: [],
    shortDescription: '',
    title: '',
    __v: 0,
    _id: '',
  };
}
