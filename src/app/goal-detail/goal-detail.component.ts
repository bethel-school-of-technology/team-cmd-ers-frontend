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
import { GoalInputService } from '../services/goal-input.service';
import { DailyGoalInput } from '../models/daily-goal-input';


export interface DialogData {
  name?: string;
  description?: string;
}

// export interface DailyGoalInputs {
//   goalId: number;
//   inputId: number;
//   date: Date;
//   userProgress: number;
// }

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
  goal_id: number = 0;

  curGoal: Goal = new Goal();
  progInput: number = 0;
  progressLog: DailyGoalInput[] = [];

  constructor(private activeRoute:ActivatedRoute, private goalService: GoalService, public dialog:MatDialog,
              private router:Router, private userService: UserService, private goalInput: GoalInputService)
    { }

    async ngOnInit(): Promise<any> {
      // extracted the id from the url
      this.goal_id = parseInt(this.activeRoute.snapshot.paramMap.get("goalId") ?? '0');
      //console.log(this.goal_id);
  
      this.getGoal();
      await this.setUserData();
    }

  //opens the edit-dialog box/component to allow user edits to goal name and description 
  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {name: this.name, description: this.description},
      height: '300px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('goal-detail- dialog closed', result);
      this.updateData(result.data);
    });
  }

  //updates the data displayed on the goal-detail page and call the PUT API to make the chanes to the db.
  updateData(data: any){
    //console.log("update func:",data);
    this.name = data.name;
    this.description = data.description;
    this.curGoal.name = data.name;
    this.curGoal.description = data.description;
    this.goalService.updateGoal(this.curGoal).subscribe(result =>{
      //console.log(result);
    });
  }

  // takes in the goal data and sets the values for the local curGoal object
  assignGoal(gotGoal: Goal){
    this.curGoal = gotGoal;
    this.name = this.curGoal.name;
    this.description = this.curGoal.description;
    //console.log(this.curGoal);
  }

  // //gets the goal data from the db and calls assignGoal() to set values
  getGoal(): void {
    // fetch the goal that matches the id
    this.goalService.getGoalById(this.goal_id).subscribe( response => {
      // console.log("response",response);
      this.assignGoal(response);
    });
  }

  //new dailyGoalInputs progress recording
  logGoalProgress() {
    if(this.progInput === 0) {
      //console.log('invalid')
      return;
    }
    //console.log("log entry value:", progInput);
    this.goalInput.logGoalInput(this.progInput, this.goal_id).subscribe(result => {
      //console.log("results:",result);
    });
    this.progInput = 0;
  }

  //get progress log
  getProgressLog() {
     this.goalInput.getGoalLog(this.goal_id).subscribe(result => {
      //console.log("progres log:", result);  
      this.progressLog = result;   
      });
      return this.progressLog;
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
}