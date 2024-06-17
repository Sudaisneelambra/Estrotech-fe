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
  device:any

  deviceData:any

  percentOne: any;
  percentTwo: any;
  Totalpercent: any;
  target: number = 2000;


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
        this.totalData = this.commonService.calculateTotalData(
          this.dataOne,
          this.dataTwo
        );
        if (this.totalData && this.totalData?.length > 0) {
         const perc = this.commonService.calculatePercentage(this.dataOne,this.dataTwo,this.totalData, this.target);
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
  

}
