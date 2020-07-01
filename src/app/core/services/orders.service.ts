import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/global';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  get(params) {
    return this.httpClient.get(`${API_URL}orders/get`, {params: params});
  }

  getStatusCounts(params) {
    return this.httpClient.get(`${API_URL}orders/get-counts`, {params});
  }

  getUserActiveOrders(params){
    return this.httpClient.get(`${API_URL}orders/get-active-orders`, {params});
  }


}
