import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FoodDrinkRoutingModule} from './food-drink-routing.module';
import {SaveFoodDrinkComponent} from './save-food-drink/save-food-drink.component';
import {ShowFoodDrinkComponent} from './show-food-drink/show-food-drink.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        SaveFoodDrinkComponent,
        ShowFoodDrinkComponent
    ],
    imports: [
        CommonModule,
        FoodDrinkRoutingModule,
        SharedModule
    ]
})
export class FoodDrinkModule {
}
