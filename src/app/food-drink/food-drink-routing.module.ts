import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SaveFoodDrinkComponent} from './save-food-drink/save-food-drink.component';
import {ShowFoodDrinkComponent} from './show-food-drink/show-food-drink.component';
import {OneFoodDrinkResolverService} from '@core/resolvers/one-food-drink-resolver.service';
import {FoodDrinkHomeComponent} from './food-drink-home/food-drink-home.component';
import {FoodDrinkListComponent} from './food-drink-list/food-drink-list.component';
import {FoodDrinkSingleComponent} from './food-drink-single/food-drink-single.component';
import {NumericIdGuard} from '@core/guards/numeric-id.guard';
import {AdminPagesGuardGuard} from '@core/guards/admin-pages-guard.guard';

const routes: Routes = [
  {
    path: '', component: FoodDrinkHomeComponent,
    canActivate: [AdminPagesGuardGuard]
  },
  {path: 'list', component: FoodDrinkListComponent},
  {
    path: 'single/:id', component: FoodDrinkSingleComponent,
    canActivate: [
      NumericIdGuard
    ]
  },
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
    },
    canActivate: [
      NumericIdGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodDrinkRoutingModule {
}
