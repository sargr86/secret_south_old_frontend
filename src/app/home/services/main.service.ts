import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  public getFerryLocation() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(Base.url + '/home/get_places', httpOptions);
  }

  public changePlace(data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.post(Base.url + '/home/check_place',data, httpOptions);
  }
}
