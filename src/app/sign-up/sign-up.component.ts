import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser: User = new User();

  public email: string = '';
  public password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  signUp() {
    this.userService.signUp(this.newUser).subscribe(() => {
        window.alert("User Registered Successfully");
        this.router.navigate(['home']);
    }, error => {
        window.alert("User Registration Error");
        //console.log('Error: ', error)
    });
  }
}