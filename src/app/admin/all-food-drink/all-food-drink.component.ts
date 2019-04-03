import {Component, OnInit} from '@angular/core';
import {FoodDrinkService} from '../services/food-drink.service';

@Component({
    selector: 'app-all-food-drink',
    templateUrl: './all-food-drink.component.html',
    styleUrls: ['./all-food-drink.component.scss']
})
export class AllFoodDrinkComponent implements OnInit {

    constructor(
        private _foodDrink: FoodDrinkService
    ) {
    }

    ngOnInit() {
    }

}
