import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "https://localhost:4200/api/auth";

  constructor(private http: HttpClient) { }

  signUp(newUser: User){

  }

  login(userEmail: string, password:string) {

  }

  editUser(editUser: User){
    
  }

}
