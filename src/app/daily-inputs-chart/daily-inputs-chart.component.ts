import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DailyGoalInput } from '../models/daily-goal-input';
import { GoalInputService } from '../services/goal-input.service';
import { GoalDetailComponent } from '../goal-detail/goal-detail.component';

@Component({
  selector: 'app-daily-inputs-chart',
  templateUrl: './daily-inputs-chart.component.html',
  styleUrls: ['./daily-inputs-chart.component.css']
})
export class DailyInputsChartComponent implements AfterViewInit{

  goalProgress: DailyGoalInput[] = [];  //to be used to locally store the DailyInputProgress array
  goalId: number = 0;

  dates?: any[] = [];       //to be used to pull out dates from goalProgress to be used in thte chart
  inputs?: any[] = [];

  constructor(private inputService: GoalInputService, private goalDetail:GoalDetailComponent,) {
    Chart.register(...registerables);
    // this.goalProgress = 
    
  }

  //get daily goal inputs
  getProgressLog() {
    this.inputService.getGoalLog(this.goalId).subscribe(result => {
     console.log("progres log:", result);  
     this.goalProgress = result;   
     });
     return this.goalProgress;
  }

  // set local array values from the daily-goal-inputs array
  pullOutData(data: DailyGoalInput[]){
    
    for( let i=0; i<data.length; i++){
      //get data and reformat the string
      if (data[i].date) {
        let inDate = data[i].date;
        console.log(inDate);
        
        this.dates?.push(inDate);
      } else {
        console.error("date is undefined for data at index", i);
      }
      if (data[i].progressInput) {
        this.inputs?.push(data[i].progressInput);
        console.log(this.inputs);
      } else {
        console.error("progressInput is undefined for data at index", i);
      }
    
    
      //get the userprogress and add it to the inputs array

    }
    
  }


  async setup() {
    console.log("goal id:", this.goalId);
    await this.pullOutData(this.goalProgress);
    
  }

  buildChart(){

    const ctx = document.getElementById('inputsChart') as HTMLCanvasElement;

    var dateLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];  //replace with dates
    var dataVals = [12, 19, 3, 5, 2, 3];                                      //replace with inputs

    if (ctx) {
      new Chart('inputsChart', {
          type: 'bar',
          data: {
            labels: dateLabels,
            datasets: [{
              label: 'Daily Inputs',
              data: dataVals,
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
    
    this.buildChart();

    
    
  }

  async ngOnInit(){
    this.goalId = await this.goalDetail.goal_id;
    this.goalProgress = await this.getProgressLog();
    await this.setup();
  }
}
