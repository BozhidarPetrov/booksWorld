import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../../auth/store/actions';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { selectIsLoading, selectIsLoggedIn, selectIsSubmitting, selectUser, selectValidationErrors } from '../../../auth/store/reducers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

   data$ = combineLatest({
      user: this.store.select(selectUser),
      isLoading: this.store.select(selectIsLoading),
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
      isLoggedIn: this.store.select(selectIsLoggedIn),
    });

  constructor(private fb: FormBuilder, private store: Store, private http: HttpClient){}

    form = this.fb.nonNullable.group({
      searchText : ''
    });


  onSubmit(): void {
    console.log(this.form.getRawValue());
    
  }

  logout() : void {

    this.store.dispatch(authActions.logout())
    this.http.get('http://localhost:5000/api/users/logout').subscribe();

  }

}
