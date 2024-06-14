import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  hiddenValue!:boolean

  constructor(private router:Router, private commonService:CommonService){}


  buttonStyles={
    'width':'100%',
    'padding-top':'35px',
    'padding-bottom':'35px',
    'border-radius':'0px',
    'font-size':'20px',
    'border':'none',
    'outline':'none',
    'background-color':'#fbf7fa'
  };

  ngOnInit(): void {
    this.commonService.sideBarBoolean.subscribe((val)=>{
      this.hiddenValue= val
    })
  }

  goToDashboard(){
    this.router.navigate(['/home/dashboard'])
    this.commonService.sideBarBoolean.next(false)
  }

  goToDevices(){
    this.router.navigate(['/home/devices'])
    this.commonService.sideBarBoolean.next(false)
  }
}
