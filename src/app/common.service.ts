import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  sideBarBoolean=  new BehaviorSubject(false)
  routeName = new BehaviorSubject([])


  constructor(private http:HttpClient) {}

  GetData1():Observable<any>{
    return this.http.get('assets/data/data_0.json')
  }

  GetData2():Observable<any>{
    return this.http.get('assets/data/data_1.json')
  }
 

  getdevicedata():Observable<any>{
    return this.http.get('assets/data/deviceData.json')
  }

}
