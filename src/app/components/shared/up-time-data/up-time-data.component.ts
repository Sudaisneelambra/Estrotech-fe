

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Chart, ChartConfiguration, ChartItem} from 'node_modules/chart.js'
@Component({
  selector: 'app-up-time-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './up-time-data.component.html',
  styleUrls: ['./up-time-data.component.css']
})
export class UpTimeDataComponent {

  @Input() online:any
  @Input() offline:any

  ngOnChanges(){
    if(this.offline && this.online){
      this.createChart();
    }
  }

  createChart() {

    const data = {
      labels: ['Status'],
      datasets: [{
        label: 'Online',
        data: [this.online],
        backgroundColor: [
          '#3ae169'
        ],
        borderRadius: 10,
        barThickness: 50 
      },
      {
        label: 'Offline',
        data: [this.offline],
        backgroundColor: [
          '#dd3030',
        ],
        borderRadius: 10,
        barThickness: 50 
      },
      {
        label: 'total',
        data: [23],
        backgroundColor: [
          '#d9d9d9',
        ],
        borderRadius: 10,
        barThickness: 50 
      }]
    };

    const config:ChartConfiguration <'bar'>= {
      type: 'bar',
      data:data,
      options: {
        responsive: true,
        indexAxis:'y',
        aspectRatio:10,
        scales: {
          y: {
            display: false,
            stacked: true,
            ticks: {
              stepSize: 1
            }
          },
          x:{
            beginAtZero: true,
            max: 23,
            stacked: true,
            ticks: {
              stepSize: 1 
            },
            grid: {
              display: false 
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        layout:{
          padding:{
            top:0,
            left:0,
            right:0,
            bottom:0
          }
        }
        
      }
    };

    const chartItem = document.getElementById('bar') as ChartItem;
    new Chart(chartItem, config);
  }

}


