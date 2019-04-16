import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddToursComponent} from './add-tours/add-tours.component';
import {AllToursComponent} from './all-tours/all-tours.component';
import {AddToursTypeComponent} from './add-tours-type/add-tours-type.component';
import {AllToursTypeComponent} from './all-tours-type/all-tours-type.component';
import {AddFoodDrinkComponent} from './add-food-drink/add-food-drink.component';
import {AllFoodDrinkComponent} from './all-food-drink/all-food-drink.component';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {EditFerryComponent} from './edit-ferry/edit-ferry.component';
import {ShowFerriesComponent} from './ferry/show-ferries/show-ferries.component';
import {SaveFerryComponent} from './ferry/save-ferry/save-ferry.component';
import {SaveTourComponent} from './tours/save-tour/save-tour.component';
import {ShowToursComponent} from './tours/show-tours/show-tours.component';
import {ShowPartnersComponent} from './partners/show-partners/show-partners.component';
import {SavePartnerComponent} from './partners/save-partner/save-partner.component';
import {ShowTourTypesComponent} from './tours/show-tour-types/show-tour-types.component';
import {SaveTourTypeComponent} from './tours/save-tour-type/save-tour-type.component';
import {OneFerryResolverService} from '../shared/resolvers/one-ferry-resolver.service';
import {OneTourResolverService} from '../shared/resolvers/one-tour-resolver.service';

const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent, data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'all_ferries', component: ShowFerriesComponent, data: {
            title: 'All ferries'
        }
    },
    {
        path: 'add_ferries', component: SaveFerryComponent, data: {
            title: 'Add a new ferry'
        }
    },
    {
        path: 'ferry/:id', component: SaveFerryComponent, data: {
            title: 'Edit a ferry info',

        },
        resolve: {
            oneFerry: OneFerryResolverService
        }
    },
    {
        path: 'all_tours', component: ShowToursComponent, data: {
            title: 'All tours'
        }
    },
    {
        path: 'add_tours', component: SaveTourComponent, data: {
            title: 'Add a new tour'
        }
    },
    {
        path: 'tour/:id', component: SaveTourComponent, data: {
            title: 'Edit a tour info'
        },
        resolve: {
            oneTour: OneTourResolverService
        }
    },
    {
        path: 'all_tours_types', component: ShowTourTypesComponent, data: {
            title: 'All tour types'
        }
    },
    {
        path: 'tour_type/:id', component: SaveTourTypeComponent, data: {
            title: 'Edit a tour type info'
        }
    },
    {
        path: 'add_tours_types', component: SaveTourTypeComponent, data: {
            title: 'Add a new tour type'
        }
    },
    {path: 'add_food-drink', component: AddFoodDrinkComponent},
    {path: 'all_food-drink', component: AllFoodDrinkComponent},
    {
        path: 'all_partners', component: ShowPartnersComponent, data: {
            title: 'All partners'
        }
    },
    {
        path: 'add_partners', component: SavePartnerComponent, data: {
            title: 'Add a new partner'
        }
    },
    {
        path: 'partner/:id', component: SavePartnerComponent, data: {
            title: 'Edit a partner'
        }
    },
    {path: 'add_locations', component: GpsLocationComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
