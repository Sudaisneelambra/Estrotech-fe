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
      return totalData;
    }
    return;
  }

  getUptimeData():Observable<any>{
    return this.http.get('assets/data/uptimeData.json')
  }
}
