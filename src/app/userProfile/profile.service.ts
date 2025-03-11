import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterResponseInterface } from '../auth/types/registerResponse';
import { MongooseUserInterface } from '../shared/types/mongooseUser';
import { RegisterRequestInterface } from '../auth/types/registerRequest';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

    getUser(response: RegisterResponseInterface): MongooseUserInterface {
      return response.user;
    }
  
    editProfile(data: RegisterRequestInterface): Observable<MongooseUserInterface> {
      const url = environment.apiUrl + '/users/profile/edit';
  
      return this.http
        .put<RegisterResponseInterface>(url, data)
        .pipe(map(this.getUser));
    }
}
