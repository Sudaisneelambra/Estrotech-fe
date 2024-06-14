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



  ngOnInit(): void {
    this.getCurrentRoute()
  }

  getCurrentRoute() {

    if(this.router.url){
      this.currentRoute = this.router.url.replace('/', '').split('/').filter((segment:any) => segment !== 'home')
      this.commonService.routeName.next(this.currentRoute)     
    }
  }

 

}


