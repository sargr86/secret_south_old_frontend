import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/settings';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesService {

    constructor(
        private http: HttpClient
    ) {
    }

    get() {
        return this.http.get(`${API_URL}activities/get`);
    }

    getOne(params) {
        return this.http.get(`${API_URL}activities/getOne`, {params: params});
    }

    add(params) {
        return this.http.post(`${API_URL}activities/add`, params);
    }

    update(params) {
        return this.http.put(`${API_URL}activities/update`, params);
    }

    remove(params) {
        return this.http.delete(`${API_URL}activities/remove`, {params: params});
    }

    getPartners() {
        return this.http.get(API_URL + 'activities/get-partners');
    }

    addType(data) {

        return this.http.post(`${API_URL}activity_types/add`, data);
    }

    getTypes() {

        return this.http.get(`${API_URL}activity_types/get`);
    }

    updateType(params) {
        return this.http.put(`${API_URL}activity_types/update`, params);
    }

    getOneType(params) {
        return this.http.get(`${API_URL}activity_types/getOne`, {params: params});
    }
}
