import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../goal-detail/goal-detail.component';

export interface EditsData {
   email: string;
   password: string;
}

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.css']
})
export class SignInDialogComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<SignInDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit(): void {
   
    console.log(" sign in OPEN");
  }

  signin(){
    console.log(this.email, this.password);
    this.dialogRef.close({confirmed:true, data:{email:this.email, password: this.password}});
      //   this.userService.login(this.email, this.password).subscribe((response:any) => {
      //     this.router.navigateByUrl('/dashboard');
      //   }, error => {
      //     console.log('Error: ', error);
      //     window.alert('Unsuccessful Login');
      //     // this.router.navigateByUrl('/home');
      //   });
      // }
}}
