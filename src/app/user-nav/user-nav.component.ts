import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {

  constructor(private userService:UserService, private router:Router, private app: AppComponent){}

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    
  signOut(): void {
    // call user service to signout and reroute to Home page
    this.userService.signOut();
    this.homeRoute();
    this.app.checkForUserToken();
  }


  //method for routing to the home page
  homeRoute(){
    console.log("routing to home page");
    this.router.navigate(['home']);
  }

  stats(){
    alert("stats page does not yet exist");
    
  }

  closeSidenav(sidenav: MatSidenav) {
    sidenav.close();
  }
}
