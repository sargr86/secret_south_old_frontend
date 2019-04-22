import {Component, OnInit} from '@angular/core';
import {FOOD_DRINK_TABLE_COLUMNS, SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {Observable} from 'rxjs';
import {FoodDrinkService} from '../../services/food-drink.service';

@Component({
    selector: 'app-show-food-drink',
    templateUrl: './show-food-drink.component.html',
    styleUrls: ['./show-food-drink.component.scss']
})
export class ShowFoodDrinkComponent implements OnInit {
    displayedColumns = FOOD_DRINK_TABLE_COLUMNS;
    spinnerDiameter = SPINNER_DIAMETER;
    foodDrinks: Observable<any>;

    constructor(
        private _foodDrink: FoodDrinkService
    ) {
    }

    ngOnInit() {
        this.foodDrinks = this._foodDrink.getFoodDrink();
    }

}
