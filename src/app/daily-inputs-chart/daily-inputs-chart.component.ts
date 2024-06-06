import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DailyGoalInput } from '../models/daily-goal-input';
import { GoalInputService } from '../services/goal-input.service';
import { GoalDetailComponent } from '../goal-detail/goal-detail.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-daily-inputs-chart',
  templateUrl: './daily-inputs-chart.component.html',
  styleUrls: ['./daily-inputs-chart.component.css']
})
export class DailyInputsChartComponent implements AfterViewInit{

  goalProgress: DailyGoalInput[] = [];  //to be used to locally store the DailyInputProgress array
  goal_id: number = 0;

  dates: any[] = [];       //to be used to pull out dates from goalProgress to be used in thte chart
  inputs: any[] = [];

  constructor(private inputService: GoalInputService, private activeRoute:ActivatedRoute) {
    Chart.register(...registerables);
    // this.goalProgress = 
    
  }

  // set local array values from the daily-goal-inputs array
  pullOutData(data: DailyGoalInput[]){

    this.dates = [];
    this.inputs = [];
    
    for( let i=0; i<data.length; i++){
      //get data and reformat the string
      if (data[i].date) {
        let inDate = data[i].date;
        console.log(inDate);
        
        this.dates.push(inDate);
      } else {
        console.error("date is undefined for data at index", i);
      }
      if (data[i].progressInput) {
        this.inputs.push(data[i].progressInput);
        console.log(this.inputs);
      } else {
        console.error("progressInput is undefined for data at index", i);
      }
    
      //get the userprogress and add it to the inputs array
    }

        
    console.log(this.dates);
    console.log(this.inputs);
    this.buildChart();
    
  }



  buildChart(){

    const ctx = document.getElementById('inputsChart') as HTMLCanvasElement;

    var dateLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];  //replace with dates
    var dataVals = [12, 19, 3, 5, 2, 3];                                      //replace with inputs

    if (ctx) {
      new Chart('inputsChart', {
          type: 'bar',
          data: {
            labels: this.dates,
            datasets: [{
              label: 'Daily Inputs',
              data: this.inputs,
              borderWidth: 0,
              backgroundColor: '#4db6ac',
              borderColor: '#1a237e',
              // hoverBackgroundColor: '#9575cd',
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  }
}

  ngAfterViewInit(): void {
    

    
    
  }

  ngOnInit(){
    this.goal_id = parseInt(this.activeRoute.snapshot.paramMap.get("goalId") ?? '0');
    this.inputService.getGoalLog(this.goal_id).subscribe(result => {
      console.log("progres log:", result);  
      this.goalProgress = result;  
      this.pullOutData(this.goalProgress) 
      });

  }
}
