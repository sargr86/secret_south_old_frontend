import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SaveFoodDrinkComponent} from './save-food-drink/save-food-drink.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RoleGuard} from '../shared/guards/role.guard';
import {ShowFoodDrinkComponent} from './show-food-drink/show-food-drink.component';
import {ShowPartnersComponent} from '../partners/show-partners/show-partners.component';
import {OneFoodDrinkResolverService} from '../shared/resolvers/one-food-drink-resolver.service';

const routes: Routes = [
    {path: '', component: ShowFoodDrinkComponent},
    {
        path: 'add', component: SaveFoodDrinkComponent, data: {
            title: 'Add a new food/drink place',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },

    {
        path: ':id', component: SaveFoodDrinkComponent, data: {
            title: 'Edit a food/drink info',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            oneFoodDrink: OneFoodDrinkResolverService
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FoodDrinkRoutingModule {
}
