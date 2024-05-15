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

  ngOnInit(): void{
    this.goalService.getAllGoals().subscribe(response => {
      console.log(response);
      this.userGoals = response;
    })
  }

}
