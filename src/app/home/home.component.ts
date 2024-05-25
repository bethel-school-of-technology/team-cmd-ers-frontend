import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string = '';
  password: string = '';


  constructor(private userService: UserService, private router: Router) { }

 ngOnInit(): void {
 }


 signin(){
  this.userService.login(this.email, this.password).subscribe((response:any) => {
      this.router.navigateByUrl('/dashboard');
  }, error => {
    console.log('Error: ', error);
    window.alert('Unsuccessful Login');
    // this.router.navigateByUrl('/home');
});
}
}
 
