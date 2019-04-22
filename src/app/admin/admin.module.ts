import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddToursComponent} from './add-tours/add-tours.component';
import {AllToursComponent} from './all-tours/all-tours.component';
import {AgmCoreModule} from "@agm/core";
import {AddFoodDrinkComponent} from './add-food-drink/add-food-drink.component';
import {AllFoodDrinkComponent} from './all-food-drink/all-food-drink.component';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {SharedModule} from '../shared/shared.module';
import {ShowFerriesComponent} from './ferry/show-ferries/show-ferries.component';
import {SaveFerryComponent} from './ferry/save-ferry/save-ferry.component';
import {ShowToursComponent} from './tours/show-tours/show-tours.component';
import {SaveTourComponent} from './tours/save-tour/save-tour.component';
import { ShowPartnersComponent } from './partners/show-partners/show-partners.component';
import { SavePartnerComponent } from './partners/save-partner/save-partner.component';
import { ShowTourTypesComponent } from './tours/show-tour-types/show-tour-types.component';
import { SaveTourTypeComponent } from './tours/save-tour-type/save-tour-type.component';
import { ShowFoodDrinkComponent } from './food-drink/show-food-drink/show-food-drink.component';
import { SaveFoodDrinkComponent } from './food-drink/save-food-drink/save-food-drink.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AddToursComponent,
        AllToursComponent,
        AddFoodDrinkComponent,
        AllFoodDrinkComponent,
        GpsLocationComponent,
        ShowFerriesComponent,
        SaveFerryComponent,
        ShowToursComponent,
        SaveTourComponent,
        ShowPartnersComponent,
        SavePartnerComponent,
        ShowTourTypesComponent,
        SaveTourTypeComponent,
        ShowFoodDrinkComponent,
        SaveFoodDrinkComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ]
})
export class AdminModule {
}
