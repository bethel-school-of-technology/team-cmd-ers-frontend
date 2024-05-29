import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  // public email: string = '';
  // public password: string = '';

  


  constructor() { }

  

  ngOnInit(): void {
  };


//   signin(){
// console.log(this.email, this.password);

//     this.userService.login(this.email, this.password).subscribe((response:any) => {
//       this.router.navigateByUrl('/dashboard');
//     }, error => {
//       console.log('Error: ', error);
//       window.alert('Unsuccessful Login');
//       // this.router.navigateByUrl('/home');
//     });
//   }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(SignInDialogComponent, {
  //     data: {email: this.email, password: this.password}, height: "200px", width: "300px",
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //     // this. = result;
  //   });
  // }
}

 
