import { Component } from '@angular/core';
import { GoalInputService } from '../services/goal-input.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private service:GoalInputService){

  }

  

}


