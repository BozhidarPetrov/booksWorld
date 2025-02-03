import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterRequestInterface } from './types/registerRequest';
import { RegisterResponseInterface } from './types/registerResponse';
import { MongooseUserInterface } from '../shared/types/mongooseUser';
import { LoginRequestInterface } from './types/loginRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, ) {}

  getUser(response: RegisterResponseInterface): MongooseUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<MongooseUserInterface> {
    const url = environment.apiUrl + '/users/register';

    return this.http
      .post<RegisterResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<MongooseUserInterface> {
    const url = environment.apiUrl + '/users/login';

    return this.http
      .post<RegisterResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }
}
