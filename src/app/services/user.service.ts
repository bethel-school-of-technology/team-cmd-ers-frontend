import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "http://localhost:5043/auth";
  userToken: string = "token";

  constructor(private http: HttpClient) { }

  signUp(newUser: User){
    console.log("service: ",newUser);
    return this.http.post(`${this.baseURL}/signup`, newUser);
  }

  login(userEmail: string, password:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', userEmail);
    queryParams = queryParams.append('password', password);

    return this.http.get(`${this.baseURL}/signin`, {params: queryParams, responseType: 'text'})
    .pipe(tap((response:any) => {
      localStorage.setItem('token', response);
    }));
  }

  getUserById(userId: number): Observable<User>{
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    console.log(localStorage.getItem(this.userToken));
    return this.http.get<User>(`${this.baseURL}/dashboard`,{headers:reqHeaders});
  }

  editUser(editUser: User){

  }

}
