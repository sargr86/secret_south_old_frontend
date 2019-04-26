import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/settings';

@Injectable({
    providedIn: 'root'
})
export class ActivityTypesService {

    constructor(
        private http: HttpClient
    ) {
    }

    remove(params) {
        console.log(params)
        return this.http.delete(`${API_URL}activity_types/remove`, {params: params});
    }


}
