import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-second-nav',
  templateUrl: './second-nav.component.html',
  styleUrls: ['./second-nav.component.css'],
  standalone:true,
  imports:[CommonModule,CapitalizePipe]
})
export class SecondNavComponent implements OnInit{

  route:any
  bool:any
  constructor(private commonService:CommonService){}


  ngOnInit(): void {
    this.commonService.routeName.subscribe((val)=>{
      this.route= val      
    })
  }
  
  handleClick(){    
    this.commonService.sideBarBoolean.subscribe((val)=>{
      this.bool = val
    })
    
    if(this.bool){
      this.commonService.sideBarBoolean.next(false)
    }else{
      this.commonService.sideBarBoolean.next(true)
    }
  }
}
