import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";
import {API_URL} from '../../shared/constants/settings';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(private http: HttpClient) {
    }

    public getFerryLocation() {
        return this.http.get(`${API_URL}home/get_places`);
    }

    public changePlace(data) {
        const type = data.type.toLowerCase().replace('/', '-');
        return this.http.get(`${API_URL}${type}/get`);
    }
}
