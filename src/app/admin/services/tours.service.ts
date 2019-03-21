import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) {
  }

  public getAllpartner() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(Base.url + '/allPartner');
  }

  public insertToursType(data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.post(Base.url + '/addTourType', data, httpOptions);
  }

  public getAllTourType() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(Base.url + '/allTourType', httpOptions);
  }

  public getAllTours() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(Base.url + '/allTours', httpOptions);
  }

  public insertTours(data) {

    return this.http.post(Base.url + '/addTours', data);
  }
}
