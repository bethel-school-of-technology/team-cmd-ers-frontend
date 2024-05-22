import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from '../models/goal';
import { GoalService } from '../services/goal.service';
import { MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css'],
  standalone: true,
  imports: [MatButtonModule],
})
export class GoalDetailComponent {

  curGoal: Goal = new Goal();

  goal_id: number = 0;

  prevProgress?: number = 0;

  constructor(private activeRoute:ActivatedRoute, private goalService: GoalService, public dialog:MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  updateProgress(){
    this.prevProgress = this.curGoal.userProgress;
    let todaysNum = this.curGoal.userProgress;
    // console.log(this.curGoal.userProgress);
    return todaysNum;

  }

  ngOnInit(): void {
    // extracted the id from the url
    this.goal_id = parseInt(this.activeRoute.snapshot.paramMap.get("id") ?? '0');
    // console.log(this.goal_id);

    // fetch the goal that matches the id
    this.goalService.getGoalById(this.goal_id).subscribe( response => {
      // console.log(response);
      this.curGoal = response;
      this.prevProgress = this.curGoal.userProgress;
    });
  }

}



// $('#myModal').modal(options)
