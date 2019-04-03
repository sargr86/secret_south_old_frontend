import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as Base from "../../config.js";

@Injectable({
    providedIn: 'root'
})
export class FoodDrinkService {

    constructor(private http: HttpClient) {
    }

    public insertFoodDrink(data) {
        return this.http.post(Base.url + '/addFoodDrink', data);
    }

    public getAllTourType() {

        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
            })
        };

        return this.http.get(Base.url + '/allTourType', httpOptions);
    }

    getFoodDrink() {
        return this.http.get(Base.url + '/allFoodDrink');
    }
}
