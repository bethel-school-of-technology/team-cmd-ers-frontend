import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { GoalService } from './goal.service';
import { DailyGoalInput } from '../models/daily-goal-input';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoalInputService {

  goalInputUrl: string = "http://localhost:5043/DailyGoalInput?goalId=";
  userToken: string = "token";
  // goalId?: number;

  constructor(private http:HttpClient, private goalService:GoalService,) { 
    
  }



  //create an entry
  logGoalInput(progressInput: number, goalId: number){
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    let goalProg = new DailyGoalInput;
    goalProg.goalId = goalId;
    goalProg.progressInput = progressInput;
    console.log("log service:",goalProg.goalId, "|",goalProg.progressInput)
    return this.http.post<DailyGoalInput>(this.goalInputUrl+`${goalId}`, goalProg, {headers:reqHeaders});
  }
  
  //retrieve all entries
  getGoalLog(goalId: number){
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    return this.http.get<DailyGoalInput[]>(this.goalInputUrl+`${goalId}`, {headers:reqHeaders});
  }



  //retrieve entries for the last week

  //retrieve entries for the last month
}
