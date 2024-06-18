import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { Data } from '../../data.interface';

@Component({
  selector: 'app-single-pages',
  templateUrl: './single-pages.component.html',
  styleUrls: ['./single-pages.component.css'],
})
export class SinglePagesComponent implements OnInit {
  currentRoute: any;
  deviceName: any;
  dataOne: Data[] = [];
  dataTwo: Data[] = [];
  totalData: any;
  uptimeTotalData:any
  device:any

  deviceData:any

  percentOne: any;
  percentTwo: any;
  Totalpercent: any;

   // Calculate maximum possible sum (assuming each hour has the maximum data value)
   maxPossibleSum = 120 * 24; // assuming each hour has a maximum data value of 60, and there are 24 hours in a day .so there have two data so 2*60*24

  onlineTime:any
  offlineTime:any

  constructor(
    private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commonService.getCurrentRoute(this.router.url);
    this.route.params.subscribe((val) => {
      if (val) {
        this.deviceName = val['name'];
      }
    });
    this.loadData();
    this.getDeviceData()
    this.getUpTimeData()
  }

  getDeviceData(){
    this.commonService.getdevicedata().subscribe({
      next:(res)=>{
        this.deviceData=res
        if(this.deviceData){
          this.device = this.deviceData.find((e:any)=>{
            return e.deviceName?.replace(/\s+/g, '') === this.deviceName
          })  
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  // get all data
  loadData() {
    forkJoin({
      dataOne: this.commonService.GetData1(),
      dataTwo: this.commonService.GetData2(),
    }).subscribe({
      next: (res) => {
        this.dataOne = res.dataOne;
        this.dataTwo = res.dataTwo;
        
        const total = this.commonService.calculateTotalData(
          this.dataOne,
          this.dataTwo
        );
        this.totalData = total
        
        if (this.totalData && this.totalData?.length > 0) {
         const perc = this.commonService.calculatePercentage(this.dataOne,this.dataTwo,this.totalData, this.maxPossibleSum);
         if(perc){
          this.percentOne = perc?.percentOne
          this.percentTwo = perc?.percentTwo
          this.Totalpercent = perc?.Totalpercent
         }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  // getuptimeData
  getUpTimeData(){
    this.commonService.getUptimeData().subscribe({
              next:(res)=>{
                this.uptimeTotalData= res
                if(this.uptimeTotalData){
                  this.uptimeTotalData.map((e:any)=>{
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

}
