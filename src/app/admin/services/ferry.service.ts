import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Base from '../../config.js';

@Injectable({
    providedIn: 'root'
})
export class FerryService {

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

    public insertFerry(data) {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.post(Base.url + '/insert_ferry', data, httpOptions);
    }

    public getFerry() {

        const httpOptions = {
            headers: new HttpHeaders({
                // 'content-type': 'application/json',
            })
        };

        return this.http.get(Base.url + '/all_ferry', httpOptions);
    }
}
