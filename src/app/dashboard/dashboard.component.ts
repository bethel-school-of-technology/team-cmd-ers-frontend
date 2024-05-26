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

  //stores daily quote
  dailyQuote = {};

  constructor(private goalService: GoalService, private dailyQuotes: DailyQuotesService) { }

  ngOnInit(): void{
    this.goalService.getAllGoals().subscribe(response => {
      // console.log(response);
      this.userGoals = response;
    })
    this.getQuote();
  }

  getQuote(){
    this.dailyQuotes.getDailyQuote().subscribe(response => {
      //console.log(response);
      this.dailyQuote = response;
    })
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
