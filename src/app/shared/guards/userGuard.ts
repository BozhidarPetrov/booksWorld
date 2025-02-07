import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const id = localStorage.getItem('id');

    if (id === null) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
