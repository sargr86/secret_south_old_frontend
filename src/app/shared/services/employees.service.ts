import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/settings';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {

    constructor(private http: HttpClient) {
    }

    get(company) {
        const params: any = {params: company ? {name: company} : ''};
        return this.http.get(API_URL + 'employees/get', params);
    }

    invite(params) {
        return this.http.post(`${API_URL}employees/invite`, params);
    }
}
