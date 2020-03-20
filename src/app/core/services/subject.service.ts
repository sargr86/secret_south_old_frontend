import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public mapData = new Subject<any>();
  public sidebarActions = new Subject<any>();
  public orderTypeData = new Subject<any>();

  constructor() {
  }

  setMapData(value) {
    this.mapData.next(value);
  }

  getMapData(): Observable<any> {
    return this.mapData.asObservable();
  }

  setSidebarAction(value) {
    this.sidebarActions.next(value);
  }

  getSidebarAction(): Observable<any> {
    return this.sidebarActions.asObservable();
  }

  setOrderTypeData(value) {
    this.orderTypeData.next(value);
  }

  getOrderTypeData(): Observable<any> {
    return this.orderTypeData.asObservable();
  }
}
