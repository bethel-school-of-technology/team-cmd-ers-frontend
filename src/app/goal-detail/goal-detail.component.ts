import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from '../models/goal';
import { GoalService } from '../services/goal.service';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
import { EditDialogComponent, EditsData } from '../edit-dialog/edit-dialog.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';


export interface DialogData {
  name?: string;
  description?: string;
}

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css'
 
  ]
})
export class GoalDetailComponent {

  name?: string;
  description?: string;

  firstname: string = "";

  curGoal: Goal = new Goal();

  goal_id: number = 0;

  prevProgress?: number = 0;

  constructor(private activeRoute:ActivatedRoute, private goalService: GoalService, public dialog:MatDialog,
              private router:Router, private userService: UserService){ }

  //opens the edit-dialog box/component to allow user edits to goal name and description 
  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {name: this.name, description: this.description},
      height: '40%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('goal-detail- dialog closed', result);
      this.updateData(result.data);
    });
  }

  //updates the data displayed on the goal-detail page and call the PUT API to make the chanes to the db.
  updateData(data: any){
    console.log("update func:",data);
    this.name = data.name;
    this.description = data.description;
    this.curGoal.name = data.name;
    this.curGoal.description = data.description;
    this.goalService.updateGoal(this.curGoal).subscribe(result =>{
      console.log(result);
    });
  }

  // takes in the goal data and sets the values for the local curGoal object
  assignGoal(gotGoal: Goal){
    this.curGoal = gotGoal;
    this.name = this.curGoal.name;
    this.description = this.curGoal.description;
    console.log(this.curGoal);
  }

  //gets the goal data from the db and calls assignGoal() to set values
  getGoal(): void {
    // fetch the goal that matches the id
    this.goalService.getGoalById(this.goal_id).subscribe( response => {
      console.log("response",response);
      this.assignGoal(response);
      this.prevProgress = this.curGoal.userProgress;
      
    });
  }

  //use this for updating daily progress toward the goal
  //still needs to be completed after implementing data array
  updateProgress(form: NgForm): void{
    console.log("prog update",form.value);
    let todaysNum: number = form.value.todaysNumbers;
    this.prevProgress = this.curGoal.userProgress;
    this.curGoal.userProgress = todaysNum;
    console.log(this.prevProgress,"|",this.curGoal.userProgress);
    this.goalService.updateGoal(this.curGoal).subscribe(result =>{
      console.log(result);
    });
    this.router.navigate([this.router.url]);
    
  }

  ngOnInit(): void {
    // extracted the id from the url
    this.goal_id = parseInt(this.activeRoute.snapshot.paramMap.get("goalId") ?? '0');
    console.log(this.goal_id);

    this.getGoal();
    this.setUserData();

    
  }

  async setUserData(){
    await this.userService.setUpUserData();
    this.firstname = this.capitalizeFirstLetter(this.userService.firstName);
    
    // console.log("dash set user:",this.email);
  }

   //make sure the first letter of the name is capitalized.
   capitalizeFirstLetter(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1);
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
  
}