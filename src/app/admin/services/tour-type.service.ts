import {Injectable} from '@angular/core';
import * as Base from '../../config';
import {HttpClient} from '@angular/common/http';

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
        return this.http.post(Base.url + '/removeTourType', params);
    }
}
