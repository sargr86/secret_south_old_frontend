import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypesService {

  constructor(
    private http: HttpClient
  ) {
  }

  remove(params) {
    return this.http.delete(`${API_URL}activity_types/remove`, {params});
  }

  getSubtypes(params) {
    return this.http.get(`${API_URL}activity_types/get-subtypes`, {params});
  }

  getOneSubtype(params) {
    return this.http.get(`${API_URL}activity_types/get-single-subtype`, {params});
  }


}
