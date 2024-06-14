import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import {Chart, ChartConfiguration, registerables} from 'node_modules/chart.js'
Chart.register(...registerables)

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {

  dataOne: Data[] = [];
  dataTwo: Data[] = [];
  totalData: Data[] = [];

  constructor(private commonService:CommonService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    forkJoin({
      dataOne: this.commonService.GetData1(),
      dataTwo: this.commonService.GetData2() // Ensure this method exists in your CommonService
    }).subscribe({
      next: (res) => {
        this.dataOne = res.dataOne;
        this.dataTwo = res.dataTwo;
        
        
        this.calculateTotalData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  calculateTotalData() {
    if (this.dataOne.length && this.dataTwo.length) {
      this.totalData = this.dataOne.map((dataOne, index) => ({
        hour: dataOne.hour,
        data: dataOne.data + (this.dataTwo[index]?.data || 0) 
      }));
      console.log(this.totalData);
      this.renderChart()
    }
  }


  renderChart(): void {
    const labels = this.dataOne.map(item => item.hour.toString());
    const data = {
      labels: labels,
      datasets: [
        {
        label: 'Data - 0',
        width:10,
        data: this.dataOne.map(item => item.data),
        fill: false,
        borderColor: '#7cc6ce',
        borderWidth: 1, 
        backgroundColor: '#7cc6ce',
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0 
      },
      {
        label: 'Data - 1',
        data: this.dataTwo.map(item => item.data),
        fill: false,
        borderColor: '#757fff',
        backgroundColor: '#757fff',
        borderWidth: 1, 
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0 
      },
      {
        label: 'Data - 2',
        data: this.totalData.map(item => item.data),
        fill: false,
        borderColor: '#366edd',
        backgroundColor: '#366edd',
        borderWidth: 1, 
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0 
      },
    ]
    };

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              font: {
                size: 16
              },
              color: '#333'
            },
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
              font:{
                size:10
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
              color: '#333',
              font:{
                size:10
              }
            },
            grid: {
              display: true,
              color: 'rgba(200, 200, 200, 0.2)'
            }
          }
        }
      }
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, config);
  }
}

interface Data {
  hour: number;
  data: number;
}
