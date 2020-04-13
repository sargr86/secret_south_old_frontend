import {Component, OnInit} from '@angular/core';
import {MainService} from '@core/services/main.service';
import {FoodDrink} from '@shared/models/FoodDrink';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {FOOD_DRINK_FOLDER, TIMEPICKER_THEME} from '@core/constants/settings';
import {Router} from '@angular/router';

@Component({
    selector: 'app-food-drink-list',
    templateUrl: './food-drink-list.component.html',
    styleUrls: ['./food-drink-list.component.scss']
})
export class FoodDrinkListComponent implements OnInit {

    foodDrinkObjects: FoodDrink[];
    countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES;
    personsCount = 2;
    timepickerTheme = TIMEPICKER_THEME;
    foodDrinkFolder = FOOD_DRINK_FOLDER;

    constructor(
        private main: MainService,
        public router: Router
    ) {
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
