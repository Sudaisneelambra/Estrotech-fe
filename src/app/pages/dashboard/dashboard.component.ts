import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private commonService: CommonService) {}

  currentRoute: any;
  dataOne: Data[] = [];
  dataTwo: Data[] = [];
  totalData: Data[] = [];

  bool!: boolean;
  isSmallScreen: boolean = window.innerWidth < 1050;

  percentOne: any;
  percentTwo: any;
  Totalpercent: any;

  //just assume target  2000
  target = 2000;

  ngOnInit(): void {
    this.getCurrentRoute();
    this.loadData();
    this.commonService.sidebarOpen.subscribe((val) => {
      this.bool = val;
    });

    this.checkScreenSize();
  }

  // add style based on condition
  getstyle() {
    if (this.bool && this.isSmallScreen) {
      return {
        display: 'grid',
        'grid-template-columns': '1fr',
      };
    }
    return;
  }

  // listen the screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  // check the screen size
  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1050;
  }

  // get all data 
  loadData() {
    forkJoin({
      dataOne: this.commonService.GetData1(),
      dataTwo: this.commonService.GetData2(),
    }).subscribe({
      next: (res) => {
        this.dataOne = res.dataOne;
        this.dataTwo = res.dataTwo;
        this.calculateTotalData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // calculate total of data one and data two
  calculateTotalData() {
    if (this.dataOne.length && this.dataTwo.length) {
      this.totalData = this.dataOne.map((dataOne, index) => ({
        hour: dataOne.hour,
        data: dataOne.data + (this.dataTwo[index]?.data || 0),
      }));
    }
    this.calculatePercentage();
  }

  // get correct route
  getCurrentRoute() {
    if (this.router.url) {
      this.currentRoute = this.router.url
        .replace('/', '')
        .split('/')
        .filter((segment: any) => segment !== 'home');
      this.commonService.routeName.next(this.currentRoute);
    }
  }

  // calculate percentage of dataOne , dataTwo, dataThree for progress bar
  calculatePercentage() {
    const totalData = this.totalData.reduce((acc: number, curr: Data) => {
      return (acc += curr.data);
    }, 0);

    const data0 = this.dataOne.reduce((acc: number, curr: Data) => {
      return (acc += curr.data);
    }, 0);

    const data1 = this.dataTwo.reduce((acc: number, curr: Data) => {
      return (acc += curr.data);
    }, 0);

    this.percentOne = Math.round((data0 / totalData) * 100);
    this.percentTwo = Math.round((data1 / totalData) * 100);
    this.Totalpercent = Math.round((totalData / this.target) * 100);
  }
}

interface Data {
  hour: number;
  data: number;
}
