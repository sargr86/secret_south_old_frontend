import {Injectable} from '@angular/core';
import * as Base from '../config.js';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http: HttpClient) {
  }

  public checkLogin(data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    }

    console.log(Base.url);

    return this.http.post(Base.url + '/admin_login', data, httpOptions);
  }
}
