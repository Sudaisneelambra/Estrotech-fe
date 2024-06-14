import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router:Router,private commonService:CommonService){}

  currentRoute:any
  dataOne:Data[]=[]
  dataTwo:Data[]=[]


  ngOnInit(): void {
    this.getCurrentRoute()
    this.getDataOne()
    this.getDataTwo()

  }

  getCurrentRoute() {

    if(this.router.url){
      this.currentRoute = this.router.url.replace('/', '').split('/').filter((segment:any) => segment !== 'home')
      this.commonService.routeName.next(this.currentRoute)     
    }
  }

  getDataOne(){
    this.commonService.GetData1().subscribe({
      next:(res)=>{
        this.dataOne=res
        console.log(this.dataOne);        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getDataTwo(){
    this.commonService.GetData1().subscribe({
      next:(res)=>{
        this.dataTwo=res
        console.log(this.dataTwo);        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}

interface Data {
  hour:number;
  data:number
}
