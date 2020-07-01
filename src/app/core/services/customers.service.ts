import {Injectable} from '@angular/core';
import {API_URL} from '../constants/global';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(
        private http: HttpClient
    ) {
    }

    get() {
        return this.http.get(API_URL + 'customers/get');
    }
}
