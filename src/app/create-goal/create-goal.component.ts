import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { Router } from '@angular/router';
import { Goal } from '../models/goal';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent {

  newGoal: Goal = new Goal;

  constructor(private goalService: GoalService, private router: Router) {

  }

  ngOnInit(): void {

  }

 
  async createNewGoal(addGoal: Goal) {
    this.newGoal = addGoal;
    await this.goalService.createGoal(this.newGoal).subscribe(response => {
      console.log(response);
    })
    this.dashRoute();
  }

  dashRoute(){
    console.log("routing to dashboard");
    this.router.navigate(['/dashboard']);
  }

  profileRoute(){
    this.router.navigate(['/user-profile']);
  }

  stats(){
    alert("stats page does not yet exist");
  }

}
