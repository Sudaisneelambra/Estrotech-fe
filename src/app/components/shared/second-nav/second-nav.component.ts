import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
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
  constructor(private commonService:CommonService, private router:Router){}


  ngOnInit(): void {
    this.commonService.routeName.subscribe((val)=>{
      this.route= val            
    })
  }
  
  // handle the side bar by clicking the menu
  handleClick(){ 
    this.commonService.sidebarOpen.subscribe((val)=>{
      this.bool = val
    })

     if(this.bool){
      this.commonService.sidebarOpen.next(false)
    }else{
      this.commonService.sidebarOpen.next(true)
    }
  }

  gotodevice(){
    if(this.route?.[0]==='devices'){
      this.router.navigate(['/home/devices'])
    }
  }
}
