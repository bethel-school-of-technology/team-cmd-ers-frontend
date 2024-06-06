import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-starter';
  public email: string = '';
  public password: string = '';

  hasUserToken: boolean = false;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  //check for user token on page load
  this.checkForUserToken();
}

  public checkForUserToken(){
    let test: any = localStorage.getItem('token');
    //console.log("checking: ", test);
    if (test==null){
      this.hasUserToken = false;
    } else {
      this.hasUserToken = true;
    }
    console.log(this.hasUserToken);
    
  }


  // signin(){
  //   // console.log(this.email, this.password);
    
  //       this.userService.signIn(this.email, this.password).subscribe((response:any) => {
  //         console.log("response", response);
  //         this.router.navigateByUrl('/dashboard');
  //       }, error => {
  //         console.log('Error: ', error);
  //         window.alert('Unsuccessful Login');
  //         // this.router.navigateByUrl('/home');
  //       });
  //     }
  
  
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(SignInDialogComponent, {
  //     data: {email: this.email, password: this.password}, height: "200px", width: "300px",
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('The dialog was closed', result.data.email, result.data.password);
  //     this.email = result.data.email;
  //     this.password = result.data.password;
  //     this.signin();
  //   });
  // }

  // signOut(): void {
  //   // call user service to signout and reroute to Home page
  //   this.userService.signOut();
  //   this.homeRoute();
  // }


  // //method for routing to the home page
  // homeRoute(){
  //   console.log("routing to home page");
  //   this.router.navigate(['home']);
  // }

}
