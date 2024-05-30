import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { DailyQuotesService } from '../services/daily-quotes.service';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // property to store user goals
  userGoals: Goal[] = [];

  quote: any;
  author: any;
  date: any;
  currentDate: string = new Date().toISOString().split('T')[0];

  constructor(private goalService: GoalService, private dailyQuotes: DailyQuotesService) { }

  ngOnInit(): void{
    this.goalService.getAllGoals().subscribe(response => {
      // console.log(response);
      this.userGoals = response;
    })
    this.getDailyQuote();
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

  stats(){
    alert("stats page does not yet exist");
  }

}
