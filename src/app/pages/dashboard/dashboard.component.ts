import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  currentRoute: string = '';
  
  constructor(private route: ActivatedRoute, private router: Router) {}

  hiddenValue!:boolean

  ngOnInit() {
    this.getCurrentRoute();
  }

  getCurrentRoute() {

    if(this.router.url){
      this.currentRoute = this.router.url;
      this.currentRoute = this.currentRoute.replace('/', '');
    }

  }

  booleanEvent(event:any){
    this.hiddenValue=event
    console.log(event)
  }
}
