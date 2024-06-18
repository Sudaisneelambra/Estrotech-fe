import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import {Data} from '../../data.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) {}

  dataOne: Data[] = [];
  dataTwo: Data[] = [];
  totalData: any;

  bool!: boolean;
  isSmallScreen: boolean = window.innerWidth < 1050;

  percentOne: any;
  percentTwo: any;
  Totalpercent: any;


  // Calculate maximum possible sum (assuming each hour has the maximum data value)
  maxPossibleSum = 120 * 24; // assuming each hour has a maximum data value of 60, and there are 24 hours in a day .so there have two data so 2*60*24

  ngOnInit(): void {
    this.commonService.getCurrentRoute(this.router.url);
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
        this.totalData = this.commonService.calculateTotalData(this.dataOne, this.dataTwo)
        if(this.totalData && this.totalData?.length>0){
          const perc =this.commonService.calculatePercentage(this.dataOne,this.dataTwo,this.totalData,this.maxPossibleSum);
          if(perc){
            this.percentOne = perc?.percentOne
            this.percentTwo = perc?.percentTwo
            this.Totalpercent = perc?.Totalpercent
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

 
}


