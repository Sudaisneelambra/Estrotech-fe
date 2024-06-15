import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/common.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router:Router,private commonService:CommonService){}

  currentRoute:any
  dataOne: Data[] = [];
  dataTwo: Data[] = [];
  totalData: Data[] = [];
  
  percentOne:any
  percentTwo:any
  Totalpercent:any
  target = 2000

  ngOnInit(): void {
    this.getCurrentRoute()
    this.loadData();
  }

  loadData() {
    forkJoin({
      dataOne: this.commonService.GetData1(),
      dataTwo: this.commonService.GetData2() 
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
    }
    this.calculatePercentage()
  }

  getCurrentRoute() {

    if(this.router.url){
      this.currentRoute = this.router.url.replace('/', '').split('/').filter((segment:any) => segment !== 'home')
      this.commonService.routeName.next(this.currentRoute)     
    }
  }

  calculatePercentage(){
    const totalData= this.totalData.reduce((acc:number,curr:Data)=>{
      return acc += curr.data
    },0)
    
    const data0 = this.dataOne.reduce((acc:number,curr:Data)=>{
      return acc += curr.data
    },0)

    const data1 = this.dataTwo.reduce((acc:number,curr:Data)=>{
      return acc += curr.data
    },0)

    this.percentOne = Math.round((data0/totalData)*100)
    this.percentTwo = Math.round((data1/totalData)*100)
    this.Totalpercent = Math.round((totalData/this.target)*100)

  }

  
}


interface Data {
  hour: number;
  data: number;
}