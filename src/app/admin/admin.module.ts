import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddFerryComponent} from './add-ferry/add-ferry.component';
import {AllFerryComponent} from './all-ferry/all-ferry.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddToursComponent} from './add-tours/add-tours.component';
import {AllToursComponent} from './all-tours/all-tours.component';
import {AddToursTypeComponent} from './add-tours-type/add-tours-type.component';
import {AllToursTypeComponent} from './all-tours-type/all-tours-type.component';
import {AgmCoreModule} from "@agm/core";
import {AddFoodDrinkComponent} from './add-food-drink/add-food-drink.component';
import {AllFoodDrinkComponent} from './all-food-drink/all-food-drink.component';
import {AddPartnerComponent} from './add-partner/add-partner.component';
import {AllPartnerComponent} from './all-partner/all-partner.component';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {SharedModule} from '../shared/shared.module';
import {EditFerryComponent} from './edit-ferry/edit-ferry.component';
import {ShowFerriesComponent} from './ferry/show-ferries/show-ferries.component';
import {SaveFerryComponent} from './ferry/save-ferry/save-ferry.component';
import {ShowToursComponent} from './tours/show-tours/show-tours.component';
import {SaveTourComponent} from './tours/save-tour/save-tour.component';
import { ShowPartnersComponent } from './partners/show-partners/show-partners.component';
import { SavePartnerComponent } from './partners/save-partner/save-partner.component';
import { ShowTourTypesComponent } from './tours/show-tour-types/show-tour-types.component';
import { SaveTourTypeComponent } from './tours/save-tour-type/save-tour-type.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AddFerryComponent,
        AllFerryComponent,
        AddToursComponent,
        AllToursComponent,
        AddToursTypeComponent,
        AllToursTypeComponent,
        AddFoodDrinkComponent,
        AllFoodDrinkComponent,
        AddPartnerComponent,
        AllPartnerComponent,
        GpsLocationComponent,
        EditFerryComponent,
        ShowFerriesComponent,
        SaveFerryComponent,
        ShowToursComponent,
        SaveTourComponent,
        ShowPartnersComponent,
        SavePartnerComponent,
        ShowTourTypesComponent,
        SaveTourTypeComponent,
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
