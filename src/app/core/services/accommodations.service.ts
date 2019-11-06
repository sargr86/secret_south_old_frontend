import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/settings';

@Injectable({
    providedIn: 'root'
})
export class AccommodationsService {


    constructor(private http: HttpClient) {
    }

    add(data) {
        return this.http.post(`${API_URL}accommodations/add`, data);
    }

    get() {
        return this.http.get(`${API_URL}accommodations/get`);
    }

    getOne(params) {
        return this.http.get(`${API_URL}accommodations/getOne`, {params: params});
    }

    getPartners() {
        return this.http.get(`${API_URL}accommodations/get-partners`);
    }


    update(params) {
        return this.http.put(`${API_URL}accommodations/update`, params);
    }

    remove(params) {
        return this.http.delete(`${API_URL}accommodations/remove`, {params: params});
    }
}
