import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../shared/constants/settings';

@Injectable({
    providedIn: 'root'
})
export class FoodDrinkService {

    constructor(private http: HttpClient) {
    }

    public insertFoodDrink(data) {
        return this.http.post(`${API_URL}food-drink/add`, data);
    }

    getFoodDrink() {
        return this.http.get(`${API_URL}food-drink/get`);
    }
}
