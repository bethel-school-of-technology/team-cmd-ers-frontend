import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-general-nav',
  templateUrl: './general-nav.component.html',
  styleUrls: ['./general-nav.component.css']
})
export class GeneralNavComponent {

  public email: string = '';
  public password: string = '';

  constructor(public dialog:MatDialog, private userService:UserService, private router:Router,
              private app: AppComponent ){}

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  signin(){
    // console.log(this.email, this.password);
    
        this.userService.signIn(this.email, this.password).subscribe((response:any) => {
          //console.log("response", response);
          this.app.checkForUserToken();
          this.router.navigateByUrl('/dashboard');
        }, error => {
          //console.log('Error: ', error);
          window.alert('Unsuccessful Login');
          // this.router.navigateByUrl('/home');
        });
      }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      data: {email: this.email, password: this.password}, 
      height: "400px", width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result.data.email, result.data.password);
      this.email = result.data.email;
      this.password = result.data.password;
      this.signin();
    });
  }

  closeSidenav(sidenav: MatSidenav) {
    sidenav.close();
  }

}
