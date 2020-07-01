import {Component, OnInit} from '@angular/core';
import {SubjectService} from '@core/services/subject.service';
import {FOOD_DRINK_FOLDER} from '@core/constants/global';
import {MainService} from '@core/services/main.service';
import {Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';

@Component({
    selector: 'app-food-drink-home',
    templateUrl: './food-drink-home.component.html',
    styleUrls: ['./food-drink-home.component.scss']
})
export class FoodDrinkHomeComponent implements OnInit {
    foodDrinkObjects = [];
    foodDrinkFolder = FOOD_DRINK_FOLDER;

    constructor(
        private subject: SubjectService,
        private main: MainService,
        public router: Router,
        public common: CommonService
    ) {
    }

    ngOnInit() {

        this.changePlace();
        this.common.dataLoading = false;
        this.subject.getMapData().subscribe(dt => {
            this.foodDrinkObjects = dt.list;
        });
    }

    changePlace() {
        this.main.changePlace({type: 'food/drink'}).subscribe((dt: any) => {
            this.foodDrinkObjects = dt;
        });
    }
}
