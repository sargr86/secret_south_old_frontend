import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";
import {API_URL} from '../../shared/constants/settings';

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

        return this.http.get(`${API_URL}partners/get`);
    }

    public insertToursType(data) {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.post(`${API_URL}tour_types/add`, data, httpOptions);
    }

    public getAllTourType() {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.get(`${API_URL}tour_types/get`, httpOptions);
    }


    updateToursType(params) {
        return this.http.put(`${API_URL}tour_types/update`, params);
    }

    removeToursType(params) {
        return this.http.post(`${API_URL}tour_types/remove`, params);
    }

    getOneTourType(params) {
        return this.http.get(`${API_URL}tour_types/getOne`, {params: params});
    }


    //// TOURS


    public getAllTours() {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.get(API_URL + 'tours/get', httpOptions);
    }

    insertTours(data) {

        return this.http.post(`${API_URL}tours/add`, data);
    }

    updateTour(params) {
        return this.http.put(`${API_URL}tours/update`, params);
    }

    remove(params) {
        return this.http.delete(`${API_URL}tours/remove`, {params: params});
    }

    getOneTour(params) {
        return this.http.get(`${API_URL}tours/getOne`, {params: params});
    }

    getPartners() {
        return this.http.get(API_URL + 'tours/get-partners');
    }
}
