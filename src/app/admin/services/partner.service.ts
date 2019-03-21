import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) {
  }

  public insertPartner(data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.post(Base.url + '/addPartner', data, httpOptions);
  }

  public getAllpartner() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(Base.url + '/allPartner', httpOptions);
  }
}
