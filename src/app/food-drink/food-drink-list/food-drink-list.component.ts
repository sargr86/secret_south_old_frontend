import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {FoodDrink} from '../../shared/models/FoodDrink';
import {COUNTRY_RESTRICTED_PLACES} from '../../shared/helpers/google-one-country-places-getter';
import {FOOD_DRINK_FOLDER, TIMEPICKER_THEME} from '../../shared/constants/settings';

@Component({
    selector: 'app-food-drink-list',
    templateUrl: './food-drink-list.component.html',
    styleUrls: ['./food-drink-list.component.scss']
})
export class FoodDrinkListComponent implements OnInit {

    foodDrinkObjects: FoodDrink[];
    countryRestrictredPlaces = COUNTRY_RESTRICTED_PLACES;
    personsCount = 2;
    timepickerTheme = TIMEPICKER_THEME;
    foodDrinkFolder = FOOD_DRINK_FOLDER;

    constructor(private main: MainService) {
    }

    ngOnInit() {
        this.getObjects();
    }

    getObjects() {
        this.main.changePlace({type: 'food-drink'}).subscribe((dt: FoodDrink[]) => {
            this.foodDrinkObjects = dt;
        });
    }

    getStartDate() {

    }

    dateChanged() {

    }

    personsCountChanged(e) {

    }
}