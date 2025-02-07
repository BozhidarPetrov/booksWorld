import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../auth/store/reducers';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  canActivate(): boolean {
    let loggedUser: boolean | undefined;

    this.isLoggedIn$.subscribe((data) => {
      loggedUser = data;
    });

    if (loggedUser) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
