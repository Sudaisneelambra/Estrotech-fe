import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Data } from 'src/app/data.interface';

import {
  Chart,
  ChartConfiguration,
  registerables,
} from 'node_modules/chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() dataOne: Data[] = [];
  @Input() dataTwo: Data[] = [];
  @Input() totalData: Data[] = [];

  private chart: Chart | undefined;

  // rendering chart when the data get
  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.dataOne.length > 0 &&
      this.dataTwo.length > 0 &&
      this.totalData.length > 0
    ) {
      console.log(this.dataOne);
      console.log(this.dataTwo);
      console.log(this.totalData);
      this.renderChart();
    }
  }

  ngOnInit(): void {}

  // line chart rendering
  renderChart(): void {
    const ctx = document.getElementById('line') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.dataOne.map((item) => item.hour.toString());
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Data - 0',
          data: this.dataOne.map((item) => item.data),
          fill: false,
          borderColor: '#7cc6ce',
          borderWidth: 1,
          backgroundColor: '#7cc6ce',
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          label: 'Data - 1',
          data: this.dataTwo.map((item) => item.data),
          fill: false,
          borderColor: '#757fff',
          borderWidth: 1,
          backgroundColor: '#757fff',
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          label: 'Data - 2',
          data: this.totalData.map((item) => item.data),
          fill: false,
          borderColor: '#366edd',
          borderWidth: 1,
          backgroundColor: '#366edd',
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    };

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Daily trend',
            align: 'start',
            color: '#333',
            font: {
              size: 10,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              font: {
                size: 16,
              },
              color: '#333',
            },
            grid: {
              display: false,
            },
            ticks: {
              color: 'black',
              font: {
                size: 10,
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
              color: '#333',
              font: {
                size: 10,
              },
            },
            grid: {
              display: true,
              color: 'rgba(200, 200, 200, 0.2)',
            },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }
}
