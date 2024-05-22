import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "https://localhost:4200/api/auth";

  constructor(private http: HttpClient) { }

  signUp(newUser: User){
    return this.http.post(`${this.baseURL}/signup`, newUser);
  }

  login(userEmail: string, password:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', userEmail);
    queryParams = queryParams.append('password', password);

    return this.http.get(`${this.baseURL}/login`, {params: queryParams, responseType: 'text'})
    .pipe(tap((response:any) => {
      localStorage.setItem('myCoffeeToken', response);
    }));
  }

  editUser(editUser: User){

  }

}
