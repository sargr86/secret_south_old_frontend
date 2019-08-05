import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SaveFoodDrinkComponent} from './save-food-drink/save-food-drink.component';
import {ShowFoodDrinkComponent} from './show-food-drink/show-food-drink.component';
import {OneFoodDrinkResolverService} from '../shared/resolvers/one-food-drink-resolver.service';
import {FoodDrinkHomeComponent} from './food-drink-home/food-drink-home.component';
import {FoodDrinkListComponent} from './food-drink-list/food-drink-list.component';

const routes: Routes = [
    {path: '', component: FoodDrinkHomeComponent},
    {path: 'list', component: FoodDrinkListComponent},
    {path: 'show', component: ShowFoodDrinkComponent},
    {
        path: 'add', component: SaveFoodDrinkComponent, data: {
            title: 'Add a new food/drink place',
        },
    },

    {
        path: ':id', component: SaveFoodDrinkComponent, data: {
            title: 'Edit a food/drink info',
        },
        resolve: {
            foodDrink: OneFoodDrinkResolverService
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FoodDrinkRoutingModule {
}
