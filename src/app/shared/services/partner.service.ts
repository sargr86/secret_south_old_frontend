import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";
import {API_URL} from '../constants/settings';

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

        return this.http.post(API_URL + 'partners/add', data, httpOptions);
    }

    public getAllpartner() {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.get(`${API_URL}partners/get`, httpOptions);
    }

    getOnePartner(params) {
        return this.http.get(`${API_URL}partners/getOne`, {params: params});
    }

    updatePartnerInfo(params) {
        return this.http.put(`${API_URL}partners/update`, params);
    }

    remove(params) {
        return this.http.delete(`${API_URL}partners/remove`, {params: params});
    }

    getTypes() {
        return this.http.get(`${API_URL}partners/getTypes`);
    }
}
