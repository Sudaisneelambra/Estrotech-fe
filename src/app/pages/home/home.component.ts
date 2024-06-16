import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentRoute: any;

  constructor(private router: Router, private commonService: CommonService) {}

  hiddenValue!: boolean;

  buttonStyles = {
    'width': '100%',
    'padding-top': '35px',
    'padding-bottom': '35px',
    'border-radius': '0px',
    'font-size': '20px',
    'border': 'none',
    'outline': 'none',
    'background-color': '#fbf7fa',
  };

  ngOnInit() {
    this.getCurrentRoute();
    this.commonService.sidebarOpen.subscribe((val) => {
      this.sidebarOper = val;
    });
  }

  // navigate to dashboard
  goToDashboard() {
    this.router.navigate(['/home/dashboard']);
    this.commonService.sidebarOpen.next(false);
  }

  // navigate to device
  goToDevices() {
    this.router.navigate(['/home/devices']);
    this.commonService.sidebarOpen.next(false);
  }

  // get corrent route
  getCurrentRoute() {
    if (this.router.url) {
      this.currentRoute = this.router.url;
      this.currentRoute = this.currentRoute.replace('/', '');
      this.currentRoute = this.currentRoute
        .split('/')
        .filter((segment: any) => segment !== 'home');
    }
  }

  booleanEvent(event: any) {
    this.hiddenValue = event;
  }

  sidebarOper: boolean = false;

  showFiller = false;
}
