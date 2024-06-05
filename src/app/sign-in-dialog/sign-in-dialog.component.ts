import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../goal-detail/goal-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  
  ngOnInit(): void {}

  signin(){
    // console.log(this.email, this.password);
    this.dialogRef.close({confirmed:true, data:{email:this.email, password: this.password}});
  }
}
