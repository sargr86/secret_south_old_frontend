import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowProfileComponent} from './show-profile/show-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RoleGuard} from '../shared/guards/role.guard';
import {ShowPartnersComponent} from './show-partners/show-partners.component';
import {SavePartnerComponent} from './save-partner/save-partner.component';


const routes: Routes = [
    {
        path: '',
        component: ShowPartnersComponent
    },
    {
        path: 'add',
        component: SavePartnerComponent
    },

    {
        path: 'dashboard',
        component: ShowProfileComponent,
    },
    {
        path: 'dashboard/edit',
        component: EditProfileComponent,
    },

    {
        path: 'ferries',
        loadChildren: '../ferries/ferries.module#FerriesModule',
        data: {
            expectedRole: 'partner'
        },
        canActivate: [RoleGuard]
    },
    {
        path: 'tours',
        loadChildren: '../tours/tours.module#ToursModule',
        data: {
            expectedRole: 'partner'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'food-drink',
        loadChildren: '../food-drink/food-drink.module#FoodDrinkModule',
        data: {
            expectedRole: 'partner'
        },
        canActivate: [AuthGuard, RoleGuard]
    },

    {
        path: 'accommodations',
        loadChildren: '../accommodation/accommodation.module#AccommodationModule',
        data: {
            expectedRole: 'partner'
        },
        canActivate: [AuthGuard, RoleGuard]
    },

    {
        path: 'activities',
        loadChildren: '../activities/activities.module#ActivitiesModule',
        data: {
            expectedRole: 'partner'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: ':id',
        component: SavePartnerComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule {
}
