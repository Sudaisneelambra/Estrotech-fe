import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-offline-device',
  templateUrl: './offline-device.component.html',
  styleUrls: ['./offline-device.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class OfflineDeviceComponent implements OnInit {
  offlineDevices: any[] = [];
  calculateTime: any;

  bool!: boolean;
  isSmallScreen: boolean = window.innerWidth < 1150;

  constructor(private commonService: CommonService, private router:Router) {}

  ngOnInit(): void {
    this.commonService.getdevicedata().subscribe({
      next: (res) => {
        if (res) {
          res.forEach((e: any) => {
            if (
              new Date(e.connectionStatus.connected) <=
              new Date(e.connectionStatus.disconnected)
            ) {
              this.calculateTime =
                new Date(e.connectionStatus.disconnected).getTime() -
                new Date(e.connectionStatus.connected).getTime();
              this.offlineDevices.push(e);
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.commonService.sidebarOpen.subscribe((val) => {
      this.bool = val;
    });

    this.checkScreenSize();
  }

  // calculate time in second or hour or day or week
  timeCalculation(ms: any) {
    const sec = ms / 1000;
    const min = sec / 60;
    const hr = min / 60;
    const day = hr / 24;
    const week = day / 7;
    if (week > 1) {
      return Math.floor(week) + ' weeks';
    } else if (day > 1) {
      return Math.floor(day) + ' days';
    } else if (hr > 1) {
      return Math.floor(hr) + ' hours';
    } else if (min > 1) {
      return Math.floor(min) + ' minutes';
    } else if (sec > 1) {
      return Math.floor(sec) + ' seconds';
    } else {
      return '00 seconds ';
    }
  }

  // listen the resixing of screen
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  // check the screen size
  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1150;
  }

  // add style based on condition
  getstye() {
    if (this.bool && this.isSmallScreen) {
      return {
        'flex-direction': 'column',
        'align-items': 'start',
        'justify-content': 'space-between',
        gap: '10px',
      };
    }
    return;
  }

  gotoOfflineDevice(name:any){
    const route = name.replace(/\s+/g, '')
    this.router.navigate(['/home/devices', route])
  }
}


