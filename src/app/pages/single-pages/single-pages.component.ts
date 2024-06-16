import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-single-pages',
  templateUrl: './single-pages.component.html',
  styleUrls: ['./single-pages.component.css']
})
export class SinglePagesComponent implements OnInit{

  currentRoute:any
  deviceName:any
  constructor(private router:Router, private commonService:CommonService,private route:ActivatedRoute) {}


  ngOnInit(): void {
    this.getCurrentRoute()
    this.route.params.subscribe((val)=>{
      if(val){
        this.deviceName = val['name']
      }
      
    })
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

}
