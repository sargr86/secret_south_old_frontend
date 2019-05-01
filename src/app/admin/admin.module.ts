import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from "@agm/core";
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {SharedModule} from '../shared/shared.module';
import {FerriesModule} from '../ferries/ferries.module';
import {ToursModule} from '../tours/tours.module';
import {ShowPartnersComponent} from './partners/show-partners/show-partners.component';
import {SavePartnerComponent} from './partners/save-partner/save-partner.component';
import {AccommodationModule} from '../accommodation/accommodation.module';
import {ActivitiesModule} from '../activities/activities.module';
import {FoodDrinkModule} from '../food-drink/food-drink.module';

@NgModule({
    declarations: [
        DashboardComponent,
        GpsLocationComponent,
        ShowPartnersComponent,
        SavePartnerComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ToursModule,
        FerriesModule,
        AccommodationModule,
        ActivitiesModule,
        FoodDrinkModule
    ]
})
export class AdminModule {
}
