import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../shared/constants/settings';

@Injectable({
    providedIn: 'root'
})
export class TourTypeService {

    constructor(
        private http: HttpClient
    ) {
    }

    remove(params) {
        console.log(params)
        return this.http.delete(`${API_URL}tour_types/remove`, {params: params});
    }
}
