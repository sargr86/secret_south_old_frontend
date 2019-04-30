import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/settings';

@Injectable({
    providedIn: 'root'
})
export class FoodDrinkService {

    constructor(private http: HttpClient) {
    }

    add(data) {
        return this.http.post(`${API_URL}food-drink/add`, data);
    }

    insertFoodDrink(data) {
        return this.http.post(`${API_URL}food-drink/add`, data);
    }

    getFoodDrink() {
        return this.http.get(`${API_URL}food-drink/get`);
    }

    getOneFoodDrink(params) {
        return this.http.get(`${API_URL}food-drink/getOne`,{params: params});
    }

    getPartners() {
        return this.http.get(`${API_URL}food-drink/get-partners`);
    }


    update(params) {
        return this.http.put(`${API_URL}food-drink/update`, params);
    }

    remove(params) {
        return this.http.delete(`${API_URL}food-drink/remove`, {params: params});
    }
}
