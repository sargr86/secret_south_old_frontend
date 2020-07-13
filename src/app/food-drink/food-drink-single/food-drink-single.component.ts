import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodDrinkService} from '@core/services/food-drink.service';
import {CommonService} from '@core/services/common.service';

@Component({
    selector: 'app-food-drink-single',
    templateUrl: './food-drink-single.component.html',
    styleUrls: ['./food-drink-single.component.scss']
})
export class FoodDrinkSingleComponent implements OnInit {
    foodDrinkProvider;

    constructor(
        private _food_drink: FoodDrinkService,
        private router: Router,
        private route: ActivatedRoute,
        public common: CommonService
    ) {
      this.common.dataLoading = false;
    }

    ngOnInit() {
        const foodDrinkId = this.route.snapshot.params.id;

        this._food_drink.getOneFoodDrink({id: foodDrinkId}).subscribe(dt => {
            this.foodDrinkProvider = dt;
        });
    }

}
