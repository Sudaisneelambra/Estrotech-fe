import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  currentRoute: any;
  
  constructor( private router: Router) {}

  hiddenValue!:boolean
  
  ngOnInit() {

    this.getCurrentRoute();
    }

  getCurrentRoute() {

    if(this.router.url){
      this.currentRoute = this.router.url;
      this.currentRoute = this.currentRoute.replace('/', '');
      this.currentRoute = this.currentRoute.split('/').filter((segment:any) => segment !== 'home')
    }

  }

  booleanEvent(event:any){
    this.hiddenValue=event
  }
}
