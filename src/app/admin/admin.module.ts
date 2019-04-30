import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from "@agm/core";
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {SharedModule} from '../shared/shared.module';
import {ShowToursComponent} from './tours/show-tours/show-tours.component';
import {SaveTourComponent} from './tours/save-tour/save-tour.component';
import { ShowPartnersComponent } from './partners/show-partners/show-partners.component';
import { SavePartnerComponent } from './partners/save-partner/save-partner.component';
import { ShowTourTypesComponent } from './tours/show-tour-types/show-tour-types.component';
import { SaveTourTypeComponent } from './tours/save-tour-type/save-tour-type.component';
import { ShowFoodDrinkComponent } from './food-drink/show-food-drink/show-food-drink.component';
import { SaveFoodDrinkComponent } from './food-drink/save-food-drink/save-food-drink.component';
import { SaveAccommodationComponent } from './accommodation/save-accommodation/save-accommodation.component';
import { ShowAccommodationsComponent } from './accommodation/show-accommodations/show-accommodations.component';
import { SaveActivityTypeComponent } from './activities/save-activity-type/save-activity-type.component';
import { ShowActivityTypesComponent } from './activities/show-activity-types/show-activity-types.component';
import {FerriesModule} from '../ferries/ferries.module';

@NgModule({
    declarations: [
        DashboardComponent,
        GpsLocationComponent,
        ShowToursComponent,
        SaveTourComponent,
        ShowPartnersComponent,
        SavePartnerComponent,
        ShowTourTypesComponent,
        SaveTourTypeComponent,
        ShowFoodDrinkComponent,
        SaveFoodDrinkComponent,
        SaveAccommodationComponent,
        ShowAccommodationsComponent,
        SaveActivityTypeComponent,
        ShowActivityTypesComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        FerriesModule
    ]
})
export class AdminModule {
}
