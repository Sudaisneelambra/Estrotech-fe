import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent {


  @Input() data :any

  constructor(private router:Router) {}

  calculateOnlineOrOffline(dt:any){

    if (!dt || !dt.connectionStatus || !dt.connectionStatus.connected || !dt.connectionStatus.disconnected) {
      return {
          color: 'red',
          name: 'Offline'
      };
  }
    if (
      new Date(dt.connectionStatus.connected) <=
      new Date(dt.connectionStatus.disconnected)
    ) {
      return {
        color:"red",
        name:'Offline'
      };
    }else{
      return {
        color:"#3be16a",
        name:'Online'
      }; 
    }
  }

  goToDetails(name:any){
    const route = name.replace(/\s+/g, '')
    this.router.navigate(['/home/devices', route])
  }
}
