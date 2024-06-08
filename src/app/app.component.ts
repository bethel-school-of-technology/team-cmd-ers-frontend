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
    console.log("has user token:",this.hasUserToken);
    
  }

}
