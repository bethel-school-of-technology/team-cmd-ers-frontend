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

  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";

  constructor(private http: HttpClient) { }

  signUp(newUser: User){
    console.log("service: ",newUser);
    return this.http.post(`${this.baseURL}/signup`, newUser);
  }

  signIn(userEmail: string, password:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', userEmail);
    queryParams = queryParams.append('password', password);
    
    return this.http.get(`${this.baseURL}/signin`, {params: queryParams, responseType: 'text'})
    .pipe(tap((response:any) => {
      localStorage.setItem('token', response);  //log token in local storage
      this.setUpUserData();
    }));
  }

  //separate method for sequentially logging and then parsing user data
  setUpUserData(){
    this.logUser();
    this.parseUser();
  }

  //method for getting the user data from the back-end and logging it to the local storage
  logUser(){
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    // console.log("printing:");
    
    return this.http.get<User>(`${this.baseURL}/user`,{headers:reqHeaders}).subscribe(response =>{console.log("inner:");
      // console.log(response.firstName, response.lastName, response.email); 
      const userdata = JSON.stringify(response);
      localStorage.setItem('user', userdata);
    });      
  }

  //method for pulling the user data from local storage and setting local variable values
  parseUser(){
    const userData = localStorage.getItem('user');
    // console.log(userData);

    if (userData){
      const user = JSON.parse(userData);
      // console.log("parsed from local storage:",user);
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
    } else {
      console.log("no user data found");
    }
    // console.log("user data set:", this.firstName, this.lastName, this.email);
  }

  signOut(): void {
    //delete token from local storage then re-route to home page
    let token = localStorage.getItem('token');
    if (token){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } else {
      throw new Error("not logged in yet");
    }
  }
    
  editUser(editUser: User){

  }

  
}
