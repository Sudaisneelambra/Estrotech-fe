import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit{

  constructor(private router:Router,private commonService:CommonService){}

  currentRoute:any
  deviceData:any

  ngOnInit(): void {
    this.getCurrentRoute()
    this.getdeviceDate()
  }

  getCurrentRoute() {

    if(this.router.url){
      this.currentRoute = this.router.url.replace('/', '').split('/').filter((segment:any) => segment !== 'home')
      this.commonService.routeName.next(this.currentRoute)     
    }

  }


  getdeviceDate(){
    this.commonService.getdevicedata().subscribe({
      next:(res)=>{
        this.deviceData=res
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
