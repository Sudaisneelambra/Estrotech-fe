import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) {}

  hiddenValue!: boolean;
  isSmallScreen: boolean = window.innerWidth < 650;

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
  sidebarOpen: boolean = false;

  ngOnInit() {
    this.commonService.sidebarOpen.subscribe((val) => {
      this.sidebarOpen = val;
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

  booleanEvent(event: any) {
    this.hiddenValue = event;
  }

   // listen the screen size
   @HostListener('window:resize', ['$event'])
   onResize(event: Event) {
     this.checkScreenSize();
   }

   // check the screen size
  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 650;
  }
 

 
}
