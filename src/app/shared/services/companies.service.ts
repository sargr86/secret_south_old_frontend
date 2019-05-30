import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/settings';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {

    constructor(
        private http: HttpClient
    ) {
    }

    add(params) {
        return this.http.post(`${API_URL}companies/add`, params);
    }

    get() {
        return this.http.get(`${API_URL}companies/get`);
    }

    getOne(params) {
        return this.http.get(`${API_URL}companies/getOne`, {params: params});
    }

    update(params) {
        return this.http.put(`${API_URL}companies/update`, params);
    }

    remove(params) {
        return this.http.delete(`${API_URL}companies/remove`, {params: params});
    }
}
