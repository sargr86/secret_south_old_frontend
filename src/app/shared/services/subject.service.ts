import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public mapData = new Subject<any>();
  constructor() { }

  setMapData(value){
    this.mapData.next(value)
  }

  getMapData(): Observable<any> {
    return this.mapData.asObservable();
  }
}
