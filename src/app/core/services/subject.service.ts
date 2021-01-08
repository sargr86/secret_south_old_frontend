import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public mapData = new Subject<any>();
  public mapLinesData = new Subject<any>();
  public sidebarActions = new Subject<any>();
  public orderTypeData = new Subject<any>();
  public orderData = new Subject<any>();
  public foodDrinkOrderData = new Subject<any>();
  public ferryOrderPrice = new Subject<any>();
  public ferryRoutesData = new Subject<any>();

  constructor() {
  }

  setMapData(value) {
    this.mapData.next(value);
  }

  getMapData(): Observable<any> {
    return this.mapData.asObservable();
  }

  setMapLinesData(value) {
    this.mapLinesData.next(value);
  }

  getMapLinesData(): Observable<any> {
    return this.mapLinesData.asObservable();
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

  setFerryOrderPrice(value) {
    this.ferryOrderPrice.next(value);
  }

  getFerryOrderPrice(): Observable<any> {
    return this.ferryOrderPrice.asObservable();
  }

  setFerryRoutesData(value) {
    this.ferryRoutesData.next(value);
  }

  getFerryRoutesData(): Observable<any> {
    return this.ferryRoutesData.asObservable();
  }


  setFoodDrinkOrderData(value) {
    this.foodDrinkOrderData.next(value);
  }

  getFoodDrinkOrderData(): Observable<any> {
    return this.foodDrinkOrderData.asObservable();
  }
}
