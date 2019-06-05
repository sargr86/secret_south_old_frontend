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

    /**
     * Adds a new company
     * @param params new company data
     */
    add(params) {
        return this.http.post(`${API_URL}companies/add`, params);
    }

    /**
     * Gets all companies
     * @param filter type of the companies
     */
    get(filter = {}) {
        return this.http.get(`${API_URL}companies/get`, {params: filter});
    }

    /**
     * Gets one company
     * @param params company_id parameter
     */
    getOne(params) {
        return this.http.get(`${API_URL}companies/getOne`, {params: params});
    }

    /**
     * Updates a company info
     * @param params company_id parameter
     */
    update(params) {
        return this.http.put(`${API_URL}companies/update`, params);
    }

    /**
     * Removes a company
     * @param params company_id parameter
     */
    remove(params) {
        return this.http.delete(`${API_URL}companies/remove`, {params: params});
    }
}
