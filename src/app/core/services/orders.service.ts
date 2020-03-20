import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/settings';

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


}
