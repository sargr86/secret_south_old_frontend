import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {SaveTourComponent} from '../tours/save-tour/save-tour.component';
import {ShowToursComponent} from '../tours/show-tours/show-tours.component';
import {ShowPartnersComponent} from './partners/show-partners/show-partners.component';
import {SavePartnerComponent} from './partners/save-partner/save-partner.component';
import {ShowTourTypesComponent} from '../tours/show-tour-types/show-tour-types.component';
import {SaveTourTypeComponent} from '../tours/save-tour-type/save-tour-type.component';
import {OneFerryResolverService} from '../shared/resolvers/one-ferry-resolver.service';
import {OneTourResolverService} from '../shared/resolvers/one-tour-resolver.service';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RoleGuard} from '../shared/guards/role.guard';
import {NonAuthGuard} from '../shared/guards/non-auth.guard';
import {SaveFoodDrinkComponent} from '../food-drink/save-food-drink/save-food-drink.component';
import {ShowFoodDrinkComponent} from '../food-drink/show-food-drink/show-food-drink.component';
import {OneFoodDrinkResolverService} from '../shared/resolvers/one-food-drink-resolver.service';
import {ShowAccommodationsComponent} from '../accommodation/show-accommodations/show-accommodations.component';
import {SaveAccommodationComponent} from '../accommodation/save-accommodation/save-accommodation.component';
import {OneAccommodationResolverService} from '../shared/resolvers/one-accommodation-resolver.service';
import {ShowActivityTypesComponent} from '../activities/show-activity-types/show-activity-types.component';
import {SaveActivityTypeComponent} from '../activities/save-activity-type/save-activity-type.component';
import {ShowFerriesComponent} from '../ferries/show-ferries/show-ferries.component';
import {SaveFerryComponent} from '../ferries/save-ferry/save-ferry.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';


const routes: Routes = [
    {
        path: 'dashboard/show', component: DashboardComponent, data: {
            title: 'Dashboard',
            expectedRole: 'admin'
        }, canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'dashboard/edit', component: EditProfileComponent, data: {
            title: 'Edit profile',
            expectedRole: 'admin'
        }, canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'ferries/show', component: ShowFerriesComponent, data: {
            title: 'All ferries',
            expectedRole: 'admin'
        }, canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'ferries/add', component: SaveFerryComponent, data: {
            title: 'Add a new ferry',
            expectedRole: 'admin'
        }, canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'ferry/:id', component: SaveFerryComponent, data: {
            title: 'Edit a ferry info',
            expectedRole: 'admin'

        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            oneFerry: OneFerryResolverService
        }
    },
    {
        path: 'tours/show', component: ShowToursComponent, data: {
            title: 'All tours',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'tours/add', component: SaveTourComponent, data: {
            title: 'Add a new tour',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },
    {
        path: 'tour/:id', component: SaveTourComponent, data: {
            title: 'Edit a tour info',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            oneTour: OneTourResolverService
        }
    },
    {
        path: 'tours/show-types', component: ShowTourTypesComponent, data: {
            title: 'All tour types',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },
    {
        path: 'tour_type/:id', component: SaveTourTypeComponent, data: {
            title: 'Edit a tour type info',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },
    {
        path: 'tours/add-types', component: SaveTourTypeComponent, data: {
            title: 'Add a new tour type',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },

    {
        path: 'food-drink/add', component: SaveFoodDrinkComponent, data: {
            title: 'Add a new food/drink place',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },
    {path: 'food-drink/show', component: ShowFoodDrinkComponent},
    {
        path: 'partners/show', component: ShowPartnersComponent, data: {
            title: 'All partners',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },
    {
        path: 'food_drink/:id', component: SaveFoodDrinkComponent, data: {
            title: 'Edit a food/drink info',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            oneFoodDrink: OneFoodDrinkResolverService
        }
    },
    {
        path: 'partners/add', component: SavePartnerComponent, data: {
            title: 'Add a new partner',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },
    {
        path: 'partner/:id', component: SavePartnerComponent, data: {
            title: 'Edit a partner',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
    },
    {
        path: 'add_locations', component: GpsLocationComponent,
        data: {
            title: 'Add GPS locations',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {path: 'accommodations/show', component: ShowAccommodationsComponent},
    {
        path: 'accommodations/add', component: SaveAccommodationComponent,
        data: {
            title: 'Add accommodation',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'accommodation/:id', component: SaveAccommodationComponent, data: {
            title: 'Edit an accommodation info',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            oneAccommodation: OneAccommodationResolverService
        }
    },
    {path: 'activity_types/show', component: ShowActivityTypesComponent},
    {
        path: 'activity_types/add', component: SaveActivityTypeComponent,
        data: {
            title: 'Add activity type',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'activity_type/:id', component: SaveActivityTypeComponent, data: {
            title: 'Edit an activity type',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            oneFoodDrink: OneAccommodationResolverService
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
