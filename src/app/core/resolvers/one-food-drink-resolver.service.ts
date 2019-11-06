import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {FoodDrinkService} from '../services/food-drink.service';

@Injectable({
    providedIn: 'root'
})
export class OneFoodDrinkResolverService implements Resolve<any> {

    constructor(
        private _foodDrink: FoodDrinkService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this._foodDrink.getOneFoodDrink({id: route.params.id});
    }
}
