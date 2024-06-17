import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent {

  @Input() data:any

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

}
