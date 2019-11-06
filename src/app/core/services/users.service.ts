import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/settings';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private http: HttpClient
    ) {
    }

    getUserById(params) {
        return this.http.get(`${API_URL}users/getById`, {params: params});
    }
}
