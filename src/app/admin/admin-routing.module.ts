import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AddFerryComponent} from "./add-ferry/add-ferry.component";
import {AllFerryComponent} from "./all-ferry/all-ferry.component";
import {AddToursComponent} from "./add-tours/add-tours.component";
import {AllToursComponent} from "./all-tours/all-tours.component";
import {AddToursTypeComponent} from "./add-tours-type/add-tours-type.component";
import {AllToursTypeComponent} from "./all-tours-type/all-tours-type.component";
import {AddFoodDrinkComponent} from "./add-food-drink/add-food-drink.component";
import {AllFoodDrinkComponent} from "./all-food-drink/all-food-drink.component";
import {AddPartnerComponent} from "./add-partner/add-partner.component";
import {AllPartnerComponent} from "./all-partner/all-partner.component";
import {GpsLocationComponent} from "./gps-location/gps-location.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'AddFerry', component: AddFerryComponent},
  {path: 'AllFerry', component: AllFerryComponent},
  {path: 'AddTours', component: AddToursComponent},
  {path: 'AllTours', component: AllToursComponent},
  {path: 'AddToursType', component: AddToursTypeComponent},
  {path: 'AllToursType', component: AllToursTypeComponent},
  {path: 'AddFood-Drink', component: AddFoodDrinkComponent},
  {path: 'AllFood-Drink', component: AllFoodDrinkComponent},
  {path: 'AddPartner', component: AddPartnerComponent},
  {path: 'AllPartner', component: AllPartnerComponent},
  {path: 'Addlocation', component: GpsLocationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
