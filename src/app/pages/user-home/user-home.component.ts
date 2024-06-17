import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {

  buttonStyles = {
    color: '#f3c0c2',
    'font-weight': '300',
    'border-radius': '10px',
    padding: '18px 25px',
    'font-size': '18px',
    'border':'1px solid #f3c0c2',
    'outline':'none'
  };

  currentRoute:any

  constructor(private router:Router, private commonService:CommonService){}

  ngOnInit(){
    this.getCurrentRoute()
  }

  getCurrentRoute() {

    if(this.router.url){
      this.currentRoute = this.router.url.replace('/', '').split('/').filter((segment:any) => segment !== 'home')
      this.commonService.routeName.next(this.currentRoute)     
    }

  }

  gotoEstroWebpage(){
    window.location.href = 'https://www.estrotech.in';
  }
}
