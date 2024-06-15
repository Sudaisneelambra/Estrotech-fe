import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getdevicedata().subscribe({
      next: (res) => {
        this.offlineDevices = res
          .filter((device: any) => device.connectionStatus.disconnected)
          .sort(
            (a: any, b: any) =>
              new Date(b.connectionStatus.disconnected).getTime() -
              new Date(a.connectionStatus.disconnected).getTime()
          );
          
          console.log(this.offlineDevices);
          
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
