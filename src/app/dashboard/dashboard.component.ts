import { Component, HostListener, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { DailyQuotesService } from '../services/daily-quotes.service';
import { Goal } from '../models/goal';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // property to store user goals
  userGoals: Goal[] = [];

  avgProgress = 33;

  quote: any;
  author: any;
  date: any;
  currentDate: string = new Date().toISOString().split('T')[0];

  firstName: string = "";
  lastName: string = "";
  email: string = "";

  //variables for the mat-grid-list tiling based on the window size
  gridCols: number = 1;
  gridRowHeight: string = "1:1";

  constructor(private goalService: GoalService, private dailyQuotes: DailyQuotesService, 
              private router: Router, private userService: UserService, private app:AppComponent) { 
                Chart.register(...registerables);
              }

  async ngOnInit(): Promise<void>{
    this.setGridLayout(window.innerWidth);   //initiate window size adjustments for thr grid list
    this.localStorageCheck('token');
    await this.setUserData();
    this.goalService.getAllGoals().subscribe(response => {
      console.log(response);
      this.userGoals = response;
    })
    
    await this.getDailyQuote();

    this.buildChart();
    
  }

  //add an event listener to get the window size
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
      console.log('Removed daily quote items');
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

  calcProgress(uGoal:Goal){
    // console.log(uGoal);
    let prog: number = uGoal.userProgress!=undefined ? uGoal.userProgress : 0 ;
    let max: number = uGoal.goalToReach!=undefined ? uGoal.goalToReach : 1;
    // console.log(prog, max, uGoal.id);
    let ratio : string = (prog / max * 100).toFixed(2);
    return ratio;

  }

  deleteGoal(id?: number){
    console.log(id);
    this.goalService.deleteGoal(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
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

  buildChart(){

    const ctx = document.getElementById('inputsChart') as HTMLCanvasElement;

    var progress = 50;                                     //replace with inputs

    if (ctx) {
      new Chart('inputsChart', {
          type: 'pie',
          data: {
            labels: [
              'Finished',
              'Unfinished'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [this.avgProgress, 100-this.avgProgress],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }]
          },
          // options: {
          //   scales: {
          //     y: {
          //       beginAtZero: true
          //     }
          //   }
          // }
        });
  }
}

  
}
