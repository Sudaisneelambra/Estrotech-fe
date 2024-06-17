import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-up-time-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './up-time-data.component.html',
  styleUrls: ['./up-time-data.component.css']
})
export class UpTimeDataComponent implements OnInit{
  
  numbers: number[] = Array(24).fill(0).map((x, i) => i+1);

  totalData:any
  onlineTime:any
  offlineTime:any
  
  constructor(private commonServive:CommonService) {}
  
  ngOnInit(): void {

      this.commonServive.getUptimeData().subscribe({
        next:(res)=>{
          this.totalData= res
          if(this.totalData){
            this.totalData.map((e:any)=>{
              if(e.event==='connected'){
                this.onlineTime= e.duration/3600
              } else if(e.event==='disconnected'){
                this.offlineTime= e.duration/3600
              }
            })
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      
  }

  getOnlineWidth(){
    if(this.onlineTime){
      return Math.round((this.onlineTime/24)*100)
    }
    return
  }

  getOfflineWidth(){
    if(this.offlineTime){
      const onlinepercentage = Math.round((this.onlineTime/24)*100)
      const oflinepercentage = Math.round((this.offlineTime/24)*100)      
      return (onlinepercentage+oflinepercentage)
    }
    return
  }
}
