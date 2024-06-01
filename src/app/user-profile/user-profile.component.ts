import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  firstName: string = "";
  lastName: string = "";
  email: string = "";

  constructor(private userService:UserService, private router:Router){}

  
  ngOnInit(): void{
    this.setUserData();
    
  }

  //pull user data in from local storage and sets local variable values
  setUserData(){
    if (this.firstName=="") {
      this.userService.parseUser();
    }    
    this.firstName = this.userService.firstName;
    this.lastName = this.userService.lastName;
    this.email = this.userService.email;
    // console.log("dash set user:",this.email);
  }


  //method for routing to the dashboard
  dashRoute(){
    console.log("routing to dashboard");
    this.router.navigate(['/dashboard']);
  }

  //method for routing to the profile page
  profileRoute(){
    console.log("routing to user-profile");
    this.router.navigate(['/user-profile']);
  }

  stats(){
    alert("stats page does not yet exist");
  }

  
}
