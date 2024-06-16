import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
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

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getdevicedata().subscribe({
      next: (res) => {
        res.forEach((e: any) => {
          if (
            new Date(e.connectionStatus.connected) <=
            new Date(e.connectionStatus.disconnected)
          ) {
            this.calculateTime =
              (new Date(e.connectionStatus.disconnected).getTime() -
                new Date(e.connectionStatus.connected).getTime()) /
              (1000 * 60);
            this.offlineDevices.push(e);
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.commonService.sidebarOpen.subscribe((val) => {
      this.bool = val;
      console.log(this.bool);
      
    });
    console.log(this.isSmallScreen);
    
    this.checkScreenSize();
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
        'gap': '10px',
      };
    }
    return ;
  }
}
