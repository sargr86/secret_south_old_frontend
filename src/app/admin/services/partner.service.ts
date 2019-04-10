import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";
import {API_URL} from '../../shared/constants/settings';

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

        return this.http.get(`${API_URL}partners/get`, httpOptions);
    }

    getOnePartner(params) {
        return this.http.get(Base.url + '/getOnePartner', {params: params});
    }

    updatePartnerInfo(params) {
        return this.http.post(Base.url + '/updatePartnerInfo', params);
    }

    remove(params) {
        return this.http.post(Base.url + '/removePartnerInfo', params);
    }
}
