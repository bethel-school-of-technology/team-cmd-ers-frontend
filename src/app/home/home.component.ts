import { Component, HostListener, OnInit } from '@angular/core';
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
  
  //variables for the mat-grid-list tiling based on the window size
  gridCols: number = 2;
  gridRowHeight: string = "500px";

  constructor() { }

  ngOnInit(): void {

  }

  //add an event listener to get the window size
  @HostListener('window:resize',[`$event`]) onResize(event:any){
    this.setGridLayout(event.target.innerWidth);
  }

  //set grid columns and rows variables based on the window size
  setGridLayout(width: number){
    if (width < 600) {
      this.gridCols = 1;
      this.gridRowHeight = '300px';
    } else if (width >= 600) {
      this.gridCols = 2;
      this.gridRowHeight = '500px';
    // } else  {
    //   this.gridCols = 3;
    //   this.gridRowHeight = '2:1';
    }
  }


}

 
