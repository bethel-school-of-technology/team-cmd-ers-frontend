import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateGoalComponent } from './create-goal/create-goal.component';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "signup", component: SignUpComponent },
  { path: "dashboard", component: DashboardComponent},
  // { path: "dashboard/:userId", component: DashboardComponent}, // modified for testing on 5.15.24
  { path: "create-goal", component: CreateGoalComponent},
  // { path: "create-goal/:userId", component: CreateGoalComponent},
  { path: "dashboard/goal-detail/:goalId", component: GoalDetailComponent},
  { path: "", redirectTo: "home", pathMatch:"full"}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
