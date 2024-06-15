import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Chart, ChartConfiguration, registerables} from 'node_modules/chart.js'
Chart.register(...registerables)

@Component({
  selector: 'app-device-availabe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-availabe.component.html',
  styleUrls: ['./device-availabe.component.css']
})
export class DeviceAvailabeComponent implements OnChanges{
  private chartdoughnut: Chart | undefined;

  @Input() deviceData:any

  ngOnChanges(changes: SimpleChanges): void {
    if (this.deviceData){
      this.renderChart()
    }
  }

  renderChart(): void {

    const ctx = document.getElementById('doughnut') as HTMLCanvasElement;

    if (this.chartdoughnut) {
      this.chartdoughnut.destroy();
    }

    const data = {
      labels: [
        'Online',
        'Offline',
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50],
        backgroundColor: [
          '#3ae169',
          '#dd3030',
        ],
        hoverOffset: 4
      }]
    }

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins:{
          title:{
            display: true,
            text:'Device Availability',
            align:'start',
            color: '#333'
          },
          legend: {
            display: true,
            position: 'bottom', 
            labels: {
              color: '#333', 
              font: {
                size: 12 
              }
            }
          }
        },
        
      }
    };
    new Chart(ctx, config);
  }
}
