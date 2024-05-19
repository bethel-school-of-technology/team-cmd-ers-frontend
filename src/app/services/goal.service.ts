import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  goalUrl:string = "http://localhost:5043/Goal";

  constructor(private http:HttpClient) { }

  //at some point all goals will be associated with a specific userId
  //get all goals
  getAllGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.goalUrl);
  }

  //get goal by Id
  getGoalById(goalId: number): Observable<Goal>{
    return this.http.get<Goal>(`${this.goalUrl}/${goalId}`);
  }

  //update a goal by Id
  updateGoal(editId: number, editedGoal: Goal): Observable<Goal>{
    return this.http.put<Goal>(`${this.goalUrl}/${editId}`, editedGoal);
  }

  //delete a goal
  deleteGoal(deleteId?: number):Observable<any>{
    return this.http.delete<any>(`${this.goalUrl}/${deleteId}`);
  }

  //create a new goal
  createGoal(newGoal: Goal): Observable<Goal>{
    return this.http.post<Goal>(this.goalUrl, newGoal);
  }
}
