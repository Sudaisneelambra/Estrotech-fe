import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  ChartConfiguration,
  registerables,
} from 'node_modules/chart.js';
import { CommonService } from 'src/app/common.service';
Chart.register(...registerables);

@Component({
  selector: 'app-device-availabe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-availabe.component.html',
  styleUrls: ['./device-availabe.component.css'],
})
export class DeviceAvailabeComponent implements OnInit {

  private chartdoughnut: Chart | undefined;

  deviceData: any;
  chartData: any;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    // tota device data getting
    this.commonService.getdevicedata().subscribe({
      next: (res) => {
        this.deviceData = res;
        const chartdatas = this.checkConnection(this.deviceData);
        this.renderChart(chartdatas);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // check the connection online or offline
  checkConnection(data: any) {
    let connected = 0;
    let disconnected = 0;
    data.forEach((element: any) => {
      if (
        new Date(element.connectionStatus.connected) >
        new Date(element.connectionStatus.disconnected)
      ) {
        connected++;
      } else {
        disconnected++;
      }
    });
    return [connected, disconnected];
  }

  // render doughnut the chart
  renderChart(datas: any): void {
    const ctx = document.getElementById('doughnut') as HTMLCanvasElement;

    if (this.chartdoughnut) {
      this.chartdoughnut.destroy();
    }

    const data = {
      labels: ['Online', 'Offline'],
      datasets: [
        {
          label: 'Device connection status',
          data: datas,
          backgroundColor: ['#3ae169', '#dd3030'],
          hoverOffset: 4,
        },
      ],
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#333',
              font: {
                size: 12,
              },
            },
          },
        },
      },
    };
    new Chart(ctx, config);
  }
}
