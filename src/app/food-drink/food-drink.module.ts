import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FoodDrinkRoutingModule} from './food-drink-routing.module';
import {SaveFoodDrinkComponent} from './save-food-drink/save-food-drink.component';
import {ShowFoodDrinkComponent} from './show-food-drink/show-food-drink.component';
import {SharedModule} from '@shared/shared.module';
import { FoodDrinkHeaderComponent } from './food-drink-header/food-drink-header.component';
import { FoodDrinkHomeComponent } from './food-drink-home/food-drink-home.component';
import { FoodDrinkListComponent } from './food-drink-list/food-drink-list.component';
import { FoodDrinkSingleComponent } from './food-drink-single/food-drink-single.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { FoodDrinkOrderFormComponent } from './food-drink-order-form/food-drink-order-form.component';

@NgModule({
    declarations: [
        SaveFoodDrinkComponent,
        ShowFoodDrinkComponent,
        FoodDrinkHeaderComponent,
        FoodDrinkHomeComponent,
        FoodDrinkListComponent,
        FoodDrinkSingleComponent,
        ShowOrdersComponent,
        FoodDrinkOrderFormComponent,
    ],
    exports: [
        FoodDrinkHeaderComponent
    ],
    imports: [
        CommonModule,
        FoodDrinkRoutingModule,
        SharedModule
    ]
})
export class FoodDrinkModule {
}
