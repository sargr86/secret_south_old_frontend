import {Component, OnInit} from '@angular/core';
import {FOOD_DRINK_TABLE_COLUMNS, SPINNER_DIAMETER} from '@core/constants/settings';
import {Observable} from 'rxjs';
import {FoodDrinkService} from '@core/services/food-drink.service';
import {AuthService} from '@core/services/auth.service';

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
        private _foodDrink: FoodDrinkService,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        const company = this.auth.checkRoles('admin') ? '' : this.auth.userData.company.name;
        this.foodDrinks = this._foodDrink.getFoodDrink({company: company});
    }

}
