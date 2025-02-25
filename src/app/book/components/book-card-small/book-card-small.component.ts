import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookFromMongoose } from '../../types/bookFromMongoose';

@Component({
  selector: 'app-book-card-small',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card-small.component.html',
  styleUrl: './book-card-small.component.css'
})
export class BookCardSmallComponent {

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
