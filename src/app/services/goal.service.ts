import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Goal } from '../models/goal';
import { Observable } from 'rxjs';
// import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  goalUrl:string = "http://localhost:5043/Goal";
  userToken: string = "token";

  constructor(private http:HttpClient) { }

  //at some point all goals will be associated with a specific userId
  //get all goals by userId
  getAllGoals(): Observable<Goal[]> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    // console.log(localStorage.getItem(this.userToken));
    return this.http.get<Goal[]>(`${this.goalUrl}/user`, {headers:reqHeaders});
  }

  //get goal by Id
  getGoalById(goalId: number): Observable<Goal>{
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    // console.log(localStorage.getItem(this.userToken));
    return this.http.get<Goal>(`${this.goalUrl}/${goalId}`,{headers:reqHeaders});
  }

  //update a goal by Id
  updateGoal( editedGoal?: Goal): Observable<Goal>{
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    if(editedGoal===undefined){
      throw new Error("goal undefined");
    } else {
    return this.http.put<Goal>(`${this.goalUrl}/${editedGoal.id}`, editedGoal,{headers:reqHeaders});
    }
  }
  // updateGoal(editId?: number, editedGoal?: Goal): Observable<Goal>{
  //   return this.http.put<Goal>(`${this.goalUrl}/${editId}`, editedGoal);
  // }

  //delete a goal
  deleteGoal(deleteId?: number):Observable<any>{
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    return this.http.delete<any>(`${this.goalUrl}/${deleteId}`,{headers:reqHeaders} );
  }

  //create a new goal
  createGoal(newGoal: Goal): Observable<Goal>{
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`
    }
    console.log(localStorage.getItem(this.userToken));
    return this.http.post<Goal>(this.goalUrl, newGoal, {headers:reqHeaders});
  }
}
