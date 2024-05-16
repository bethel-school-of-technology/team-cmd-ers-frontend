import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // property to store user goals
  userGoals: Goal[] = [];

  constructor(private goalService: GoalService) {

  }

  calcProgress(uGoal:Goal){
    console.log(uGoal);
    let prog: number = uGoal.userProgress!=undefined ? uGoal.userProgress : 0 ;
    let max: number = uGoal.goalToReach!=undefined ? uGoal.goalToReach : 1;
    console.log(prog, max);
    let ratio = prog / max;
    return ratio*100;

  }

  ngOnInit(): void{
    this.goalService.getAllGoals().subscribe(response => {
      console.log(response);
      this.userGoals = response;
    })
  }

}
