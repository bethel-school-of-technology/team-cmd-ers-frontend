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
  


  constructor() { }

  

  ngOnInit(): void {

  }

}

 
