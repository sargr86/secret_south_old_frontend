import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Base from '../../config.js';
import {API_URL} from '../constants/settings';

@Injectable({
  providedIn: 'root'
})
export class FerriesService {

  constructor(private http: HttpClient) {
  }

  getAllpartner() {
    return this.http.get(API_URL + 'ferries/get-partners');
  }

  add(data) {

    return this.http.post(`${API_URL}ferries/add`, data);
  }

  getFerries(params) {
    return this.http.get(`${API_URL}ferries/get`, {params: params});
  }

  getPartnerFerries() {
    return this.http.get(`${API_URL}ferries/get-for-partner`);
  }

  getOneFerry(params) {
    return this.http.get(`${API_URL}ferries/getOne`, {params: params});
  }

  update(params) {
    return this.http.put(`${API_URL}ferries/update`, params);
  }

  remove(params) {
    return this.http.delete(`${API_URL}ferries/remove`, {params: params});
  }

  removeImage(params) {
    return this.http.delete(`${API_URL}ferries/remove-image`, {params: params});
  }

  makeCover(params) {
    return this.http.put(`${API_URL}ferries/make-cover`, params);
  }

  assignDriver(params) {
    return this.http.put(`${API_URL}ferries/assign-driver`, params);
  }

  importRoutesFile(params) {
    return this.http.post(`${API_URL}ferries/import-routes-file`, params);
  }

  importPricesFile(params) {
    return this.http.post(`${API_URL}ferries/import-prices-file`, params);
  }

}
