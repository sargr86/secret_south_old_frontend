import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUserById(params) {
    return this.http.get(`${API_URL}users/getById`, {params: params});
  }

  getUsersByRole(params) {
    return this.http.get(`${API_URL}users/get-by-role`, {params: params});
  }

  createStripeCard(params) {
    return this.http.post(`${API_URL}users/create-stripe-user-card`, params);
  }

  getUserCards(params) {
    return this.http.get(`${API_URL}users/get-customer-cards`, {params: params});
  }
}
