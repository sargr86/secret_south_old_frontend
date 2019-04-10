import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Base from '../../config.js';
import {API_URL} from '../../shared/constants/settings';

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

        return this.http.get(API_URL + 'partners/get');
    }

    public insertFerry(data) {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.post(`${API_URL}ferries/add`, data, httpOptions);
    }

    public getFerry() {

        const httpOptions = {
            headers: new HttpHeaders({
                // 'content-type': 'application/json',
            })
        };

        return this.http.get(`${API_URL}ferries/get`, httpOptions);
    }

    getOneFerry(params) {
        return this.http.get(`${API_URL}ferries/getOne`, {params: params});
    }

    update(params) {
        return this.http.put(`${API_URL}ferries/update`, params);
    }

    remove(params) {

        return this.http.delete(`${API_URL}ferries/remove`, {params: params});
    }
}
