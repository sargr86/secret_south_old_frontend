import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/global';

@Injectable({
  providedIn: 'root'
})
export class FoodDrinkService {

  constructor(private http: HttpClient) {
  }

  add(data) {
    return this.http.post(`${API_URL}food-drink/add`, data);
  }

  insertFoodDrink(data) {
    return this.http.post(`${API_URL}food-drink/add`, data);
  }

  get(params) {
    return this.http.get(`${API_URL}food-drink/get`, {params: params});
  }

  getOne(params) {
    return this.http.get(`${API_URL}food-drink/getOne`, {params});
  }

  getPartners() {
    return this.http.get(`${API_URL}food-drink/get-partners`);
  }

  getByAddress(params) {
    return this.http.get(`${API_URL}food-drink/get-by-address`, {params});
  }

  getOrders(params) {
    return this.http.get(`${API_URL}food-drink/get-orders`, {params});
  }

  makeCover(params) {
    return this.http.put(`${API_URL}food-drink/make-cover`, params);
  }


  update(params) {
    return this.http.put(`${API_URL}food-drink/update`, params);
  }

  remove(params) {
    return this.http.delete(`${API_URL}food-drink/remove`, {params: params});
  }

  removeImage(params) {
    return this.http.delete(`${API_URL}food-drink/remove-image`, {params: params});
  }
}
