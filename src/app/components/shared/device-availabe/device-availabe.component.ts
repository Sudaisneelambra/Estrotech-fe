import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Chart, ChartConfiguration, registerables} from 'node_modules/chart.js'
import { CommonService } from 'src/app/common.service';
Chart.register(...registerables)

@Component({
  selector: 'app-device-availabe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-availabe.component.html',
  styleUrls: ['./device-availabe.component.css']
})
export class DeviceAvailabeComponent implements OnInit{
 
  private chartdoughnut: Chart | undefined;

  deviceData:any
  chartData:any

  constructor(private commonService:CommonService) {}

  ngOnInit(): void {
    this.commonService.getdevicedata().subscribe({
      next:(res)=>{
        this.deviceData= res
        const connected = this.deviceData.filter((e:any)=>e.connectionStatus.connected).length
        const disconnected = this.deviceData.filter((e:any)=>e.connectionStatus.disconnected).length
        this.chartData = {connected, disconnected}
        this.renderChart()
      },
      error:(err)=>{
        console.log(err);         
      } 
    })
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
        data: [this.chartData?.connected, this.chartData?.disconnected],
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
