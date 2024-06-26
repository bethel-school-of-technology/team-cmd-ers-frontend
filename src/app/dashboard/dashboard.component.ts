import { Component, HostListener, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { DailyQuotesService } from '../services/daily-quotes.service';
import { Goal } from '../models/goal';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Chart, Colors, registerables } from 'chart.js';
import { DailyGoalInput } from '../models/daily-goal-input';
import { GoalInputService } from '../services/goal-input.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // property to store user goals
  userGoals: Goal[] = [];

  //variables for use with the daily quote
  quote: any;
  author: any;
  date: any;
  currentDate: string = new Date().toISOString().split('T')[0];

  //local user data variables
  firstName: string = "";
  lastName: string = "";
  email: string = "";

  //variables for the mat-grid-list tiling based on the window size
  gridCols: number = 1;
  gridRowHeight: string = "1:1";

  constructor(private goalService: GoalService, private dailyQuotes: DailyQuotesService, 
              private router: Router, private userService: UserService, private app:AppComponent,
              private inputService: GoalInputService) { 
                Chart.register(...registerables);
              }

  async ngOnInit(): Promise<void>{
    this.setGridLayout(window.innerWidth);   //initiate window size adjustments for thr grid list
    this.localStorageCheck('token');
    await this.setUserData();
    this.goalService.getAllGoals().subscribe(response => {
      //console.log(response);
      this.userGoals = response;
    })
    
    this.getDailyQuote();
  }

  //add an event listener to get the window size - for responsive grid
  @HostListener('window:resize',[`$event`]) onResize(event:any){
    this.setGridLayout(event.target.innerWidth);
  }

  //set grid columns and rows variables based on the window size
  setGridLayout(width: number){
    if (width < 600) {
      this.gridCols = 1;
      this.gridRowHeight = '2:1';
    } else if (width >= 600 && width < 960) {
      this.gridCols = 2;
      this.gridRowHeight = '2:1';
    } else  {
      this.gridCols = 3;
      this.gridRowHeight = '2:1';
    }
  }

  //pulls user data in from local storage and sets local variable values
  async setUserData(){
    await this.userService.setUpUserData();
    this.firstName = this.capitalizeFirstLetter(this.userService.firstName);
    this.lastName = this.capitalizeFirstLetter(this.userService.lastName);
    this.email = this.userService.email;
    // console.log("dash set user:",this.email);
  }

  //make sure the first letter of the name is capitalized.
  capitalizeFirstLetter(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  //Gets our Daily quote and store in local storage
  getDailyQuote(): void {
    if (this.dateCheck(this.currentDate)) {
      localStorage.removeItem('dailyQuote');
      localStorage.removeItem('dailyQuoteAuthor');
      localStorage.removeItem('dailyQuoteDate');
      //console.log('Removed daily quote items');
    }

    if(this.localStorageCheck('dailyQuote') && this.localStorageCheck('dailyQuoteAuthor')){
      this.quote = localStorage.getItem('dailyQuote');
      this.author = localStorage.getItem('dailyQuoteAuthor');
    } else {
      this.dailyQuotes.getDailyQuote().subscribe(response => {
        this.quote = response.contents.quotes[0].quote;
        this.author = response.contents.quotes[0].author;
        this.date = response.contents.quotes[0].date;
      })
    }
  }

  //checks to see if there are any items in the local storage
  localStorageCheck(item: string): boolean {
    return localStorage.getItem(item) !== null;
  }

  //checks current date and compares it to whatever the quote in local storage is dated as
  dateCheck(currentDate: string): boolean {
    return currentDate !== localStorage.getItem('dailyQuoteDate');
  }

  //used to calculate a percentage for each goal's progress bar
  calcProgress(uGoal:Goal){
    // console.log(uGoal);
    let id=uGoal.id;
    let max: number = uGoal.goalToReach!=undefined ? uGoal.goalToReach : 1;
    // console.log("max:", max);
    let aveProg: number;
    // console.log(uGoal.dailyGoalInput);
    let inputsArr: DailyGoalInput[] = uGoal.dailyGoalInput || [];
    
    // console.log("setting daily inputs for:",`${uGoal.name}`);
    // console.log("sending to aveData next for:",`${uGoal.name}`);
    if (inputsArr.length == 0) {
      return 0;
    } else {
      aveProg = this.aveData(inputsArr, max); 
      // console.log("finished aveData, returning val to html for:",`${uGoal.name}`);
      return (aveProg/max*100).toFixed(2)
    }
  }

  //average the ProgressInput values in a given array and return the average
  // all the console.lo() statements used for testing
  aveData(arr:DailyGoalInput[], max: number): number{
    // console.log("enter AveData");
    let sum:number = 0;
    let len: number = arr.length;
    //loop through inputsArr 
    for (let i=0; i<arr.length; i++){
      // console.log(`looping ${i}`, `current value: ${arr[i].progressInput}`);
      let num = arr[i].progressInput || 0;
      //if any progressInput value is equal or greater than max, stop and set ratio to 1
      if (num >= max){
        // console.log(num);
        return max;
      }  //otherwise sum up the values for progressInput 
      else {
        // console.log(`adding ${num}`)
        sum += num;
        // console.log("sum:",sum);
      }
    }
    let ave = sum / len;
    // console.log("returning ratio:", ave);
    return ave;
  }

  deleteGoal(id?: number){
    // console.log(id);
    this.goalService.deleteGoal(id).subscribe(response => {
      // console.log(response);
      this.ngOnInit();
    })
  }
}
