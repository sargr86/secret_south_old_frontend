import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../shared/services/subject.service';
import {FOOD_DRINK_FOLDER} from '../../shared/constants/settings';
import {MainService} from '../../home/services/main.service';

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
        private main: MainService
    ) {
    }

    ngOnInit() {

        this.changePlace();

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
