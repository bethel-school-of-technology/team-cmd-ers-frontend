import { Component, OnInit } from '@angular/core';
import { GoalService } from '../services/goal.service';
import { Router } from '@angular/router';
import { Goal } from '../models/goal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent {

  newGoal: Goal = new Goal;

  firstName: string = "";
  lastName: string = "";
  email: string = "";

  constructor(private goalService: GoalService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.setUserData();
  }

  //pull user data in from local storage and sets local variable values
  async setUserData(){
    await this.userService.setUpUserData();
    this.firstName = this.capitalizeFirstLetter(this.userService.firstName);
    
    // console.log("dash set user:",this.email);
  }

  //make sure the first letter of the name is capitalized.
  capitalizeFirstLetter(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

 
  async createNewGoal(addGoal: Goal) {
    this.newGoal = addGoal;
    this.goalService.createGoal(this.newGoal).subscribe(response => {
      //console.log(response);
    })
    this.dashRoute();
  }

  //method for routing to the dashboard
  async dashRoute(){
    //console.log("routing to dashboard");
    this.router.navigate(['/dashboard']);
  }
}
