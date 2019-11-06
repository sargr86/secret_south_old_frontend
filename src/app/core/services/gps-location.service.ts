import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Base from '../../config.js';

@Injectable({
  providedIn: 'root'
})
export class GpsLocationService {

    constructor(private http: HttpClient) {
    }

    public saveLocate(data) {
        return this.http.post(Base.url + '/saveDrawing', data);
    }
}