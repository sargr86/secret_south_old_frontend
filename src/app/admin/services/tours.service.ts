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

        return this.http.get(Base.url + '/allPartner');
    }

    public insertToursType(data) {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.post(Base.url + '/addTourType', data, httpOptions);
    }

    public getAllTourType() {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.get(Base.url + '/allTourType', httpOptions);
    }


    updateToursType(params) {
        return this.http.post(Base.url + '/updateTourType', params);
    }

    removeToursType(params) {
        return this.http.post(Base.url + '/removeTourType', params);
    }

    getOneTourType(params) {
        return this.http.get(Base.url + '/getOneTourType', {params: params});
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

        return this.http.post(Base.url + '/addTours', data);
    }

    updateTour(params) {
        return this.http.post(Base.url + '/updateTour', params);
    }

    remove(params) {
        return this.http.post(Base.url + '/removeTour', params);
    }

    getOneTour(params) {
        return this.http.get(Base.url + '/getOneTour', {params: params});
    }
}
