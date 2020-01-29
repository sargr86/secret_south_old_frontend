import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/settings';

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
}
