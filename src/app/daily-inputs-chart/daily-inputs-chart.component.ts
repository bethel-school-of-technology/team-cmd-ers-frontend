import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DailyGoalInput } from '../models/daily-goal-input';
import { GoalInputService } from '../services/goal-input.service';
import { GoalDetailComponent } from '../goal-detail/goal-detail.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-daily-inputs-chart',
  templateUrl: './daily-inputs-chart.component.html',
  styleUrls: ['./daily-inputs-chart.component.css']
})
export class DailyInputsChartComponent implements OnInit{

  goalProgress: DailyGoalInput[] = [];  //to be used to locally store the DailyInputProgress array
  goal_id: number = 0;

  dates: any[] = [];       //to be used to pull out dates from goalProgress to be used in thte chart
  inputs: any[] = [];

  progressChart: Chart | undefined;

  constructor(private inputService: GoalInputService, private activeRoute:ActivatedRoute, private datepipe:DatePipe) {
    Chart.register(...registerables);
    // this.goalProgress = 
    
  }

  ngOnInit(){
    this.goal_id = parseInt(this.activeRoute.snapshot.paramMap.get("goalId") ?? '0');
    this.inputService.getGoalLog(this.goal_id).subscribe(result => {
      console.log("progres log:", result);  
      this.goalProgress = result;  
      this.pullOutData(this.goalProgress) 
      });

  }

  refreshChart(){
    this.progressChart?.destroy();
    this.inputService.getGoalLog(this.goal_id).subscribe(result => {
      console.log("progres log:", result);  
      this.goalProgress = result;  
      this.pullOutData(this.goalProgress) 
      });
  }

  // set local array values from the daily-goal-inputs array
  pullOutData(data: DailyGoalInput[]){

    this.dates = [];
    this.inputs = [];
    
    for( let i=0; i<data.length; i++){
      //get data and reformat the string
      if (data[i].date) {
        var pDate: any = data[i].date ?? "";        
        pDate = this.datepipe.transform(pDate,"yyyy-MM-dd");
        // console.log(pDate);
        this.dates.push(pDate);
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

    if(this.progressChart){
      this.progressChart.destroy;
    }

    var dateLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];  //replace with dates
    var dataVals = [12, 19, 3, 5, 2, 3];                                      //replace with inputs

    this.progressChart = new Chart('inputsChart', {
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

  // ngAfterViewInit(): void {
    

    
    
  // }

  // ngOnDestroy() {
  //   if(this.chart){
  //     this.chart.destroy();
  //   }
  // }

  

