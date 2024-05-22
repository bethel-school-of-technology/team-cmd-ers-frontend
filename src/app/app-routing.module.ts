import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateGoalComponent } from './create-goal/create-goal.component';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "signup", component: SignUpComponent },
  { path: "dashboard", component: DashboardComponent},
  // { path: "dashboard/:userId", component: DashboardComponent}, // modified for testing on 5.15.24
  { path: "create-goal/:userId", component: CreateGoalComponent},
  { path: "goal-detail/:goalId", component: GoalDetailComponent},
  { path: "user-profile", component: UserProfileComponent},
  // { path: "user-profile/:userId", component: UserProfileComponent}, //modfied fro testing on 5.21.24
  { path: "stats", component:UserProfileComponent},
  { path: "", redirectTo: "home", pathMatch:"full"}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
