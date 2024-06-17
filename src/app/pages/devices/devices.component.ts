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

  deviceData:any

  ngOnInit(): void {
    this.commonService.getCurrentRoute(this.router.url)
    this.getdeviceDate()
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
