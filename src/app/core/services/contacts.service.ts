import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/global';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient
  ) {
  }

  request(params) {
    return this.http.post(`${API_URL}contacts/request`, params);
  }

  get() {
    return this.http.get(`${API_URL}contacts/get`);
  }

  getOne(id) {
    return this.http.get(`${API_URL}contacts/get-one`, {params: {id}});
  }

  remove(params) {
    return this.http.delete(`${API_URL}contacts/remove`, {params: params});
  }
}
