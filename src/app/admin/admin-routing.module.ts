import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddFerryComponent} from './add-ferry/add-ferry.component';
import {AllFerryComponent} from './all-ferry/all-ferry.component';
import {AddToursComponent} from './add-tours/add-tours.component';
import {AllToursComponent} from './all-tours/all-tours.component';
import {AddToursTypeComponent} from './add-tours-type/add-tours-type.component';
import {AllToursTypeComponent} from './all-tours-type/all-tours-type.component';
import {AddFoodDrinkComponent} from './add-food-drink/add-food-drink.component';
import {AllFoodDrinkComponent} from './all-food-drink/all-food-drink.component';
import {AddPartnerComponent} from './add-partner/add-partner.component';
import {AllPartnerComponent} from './all-partner/all-partner.component';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {EditFerryComponent} from './edit-ferry/edit-ferry.component';
import {ShowFerriesComponent} from './ferry/show-ferries/show-ferries.component';
import {SaveFerryComponent} from './ferry/save-ferry/save-ferry.component';
import {SaveTourComponent} from './tours/save-tour/save-tour.component';
import {ShowToursComponent} from './tours/show-tours/show-tours.component';
import {ShowPartnersComponent} from './partners/show-partners/show-partners.component';
import {SavePartnerComponent} from './partners/save-partner/save-partner.component';
import {ShowTourTypesComponent} from './tours/show-tour-types/show-tour-types.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'add_ferries', component: SaveFerryComponent},
    {path: 'ferry/:id', component: SaveFerryComponent},
    {path: 'all_ferries', component: ShowFerriesComponent},
    // {path: 'AddTours', component: AddToursComponent},
    {path: 'add_tours', component: SaveTourComponent},
    {path: 'tour/:id', component: SaveTourComponent},
    {path: 'tour_type/:id', component: AddToursTypeComponent},
    // {path: 'AllTours', component: AllToursComponent},
    {path: 'all_tours', component: ShowToursComponent},
    {path: 'add_tours_types', component: AddToursTypeComponent},
    // {path: 'tours_types', component: AllToursTypeComponent},
    {path: 'all_tours_types', component: ShowTourTypesComponent},
    {path: 'add_food-drink', component: AddFoodDrinkComponent},
    {path: 'all_food-drink', component: AllFoodDrinkComponent},
    // {path: 'AddPartner', component: AddPartnerComponent},
    {path: 'add_partners', component: SavePartnerComponent},
    // {path: 'partner/:id', component: AddPartnerComponent},
    {path: 'partner/:id', component: SavePartnerComponent},
    // {path: 'AllPartner', component: AllPartnerComponent},
    {path: 'all_partners', component: ShowPartnersComponent},
    {path: 'add_locations', component: GpsLocationComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
