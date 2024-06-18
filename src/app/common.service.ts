import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from './data.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  routeName = new BehaviorSubject([]);
  sidebarOpen = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  GetData1(): Observable<any> {
    return this.http.get('assets/data/data_0.json');
  }

  GetData2(): Observable<any> {
    return this.http.get('assets/data/data_1.json');
  }

  getdevicedata(): Observable<any> {
    return this.http.get('assets/data/deviceData.json');
  }

  getUptimeData():Observable<any>{
    return this.http.get('assets/data/uptimeData.json')
  }

  // check the connection online or offline
  checkConnection(data: any) {
    let connected = 0;
    let disconnected = 0;
    data.forEach((element: any) => {
      if (
        new Date(element.connectionStatus.connected) >
        new Date(element.connectionStatus.disconnected)
      ) {
        connected++;
      } else {
        disconnected++;
      }
    });
    return [connected, disconnected];
  }


  // calculate total of data one and data two
  calculateTotalData(dataOne: Data[], dataTwo: Data[]) {
    if (dataOne.length && dataTwo.length) {
      const totalData = dataOne.map((dataOne, index) => ({
        hour: dataOne.hour,
        data: dataOne.data + (dataTwo[index]?.data || 0),
      }));
      console.log(totalData);
      
      return totalData;
    }
    return;
  }

   // get correct route
   getCurrentRoute(route:any) {
    if (route) {
      const currentRoute = route
        .replace('/', '')
        .split('/')
        .filter((segment: any) => segment !== 'home');
      this.routeName.next(currentRoute);
    }
  }

   // calculate percentage of dataOne , dataTwo, dataThree for progress bar
   calculatePercentage(dataone:any,datatwo:any,total:any,target:any) {
    const totalData = total.reduce((acc: number, curr: Data) => {
      return (acc += curr.data);
    }, 0);

    const data0 = dataone.reduce((acc: number, curr: Data) => {
      return (acc += curr.data);
    }, 0);

    const data1 = datatwo.reduce((acc: number, curr: Data) => {
      return (acc += curr.data);
    }, 0);

    const percentOne = Math.round((data0 / totalData) * 100);
    const percentTwo = Math.round((data1 / totalData) * 100);
    const Totalpercent = Math.round((totalData / target) * 100);

    return {
      percentOne,
      percentTwo,
      Totalpercent,
    }
  }
}
