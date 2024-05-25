import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from '../models/goal';
import { GoalService } from '../services/goal.service';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditDialogComponent, EditsData } from '../edit-dialog/edit-dialog.component';


export interface DialogData {
  name?: string;
  description?: string;
}

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css'],
  standalone: true,
  imports: [MatButtonModule],
})
export class GoalDetailComponent {

  name?: string;
  description?: string;

  curGoal: Goal = new Goal();

  goal_id: number = 0;

  prevProgress?: number = 0;

  constructor(private activeRoute:ActivatedRoute, private goalService: GoalService, public dialog:MatDialog,){ }

  //opens the edit-dialog box/component to allow user edits to goal name and description 
  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {name: this.name, description: this.description},
      height: '30%',
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

  updateProgress(){
    console.log(this.curGoal.userProgress);
    this.prevProgress = this.curGoal.userProgress;
    // let todaysNum = this.curGoal.userProgress;
    // console.log(this.curGoal.userProgress);
    // return todaysNum;
  }

  ngOnInit(): void {
    // extracted the id from the url
    this.goal_id = parseInt(this.activeRoute.snapshot.paramMap.get("goalId") ?? '0');
    console.log(this.goal_id);

    this.getGoal();

    
  }

  
}