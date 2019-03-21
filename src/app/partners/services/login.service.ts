import {Injectable} from '@angular/core';
import * as Base from "../../config.js";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public checkLogin(data) {

    return this.http.post(Base.url + 'checkPartner', data);
  }
}
