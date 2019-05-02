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
import {AccommodationModule} from '../accommodation/accommodation.module';
import {ActivitiesModule} from '../activities/activities.module';
import {FoodDrinkModule} from '../food-drink/food-drink.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {PartnersModule} from '../partners/partners.module';

@NgModule({
    declarations: [
        DashboardComponent,
        GpsLocationComponent,
        EditProfileComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ToursModule,
        FerriesModule,
        AccommodationModule,
        ActivitiesModule,
        FoodDrinkModule,
        PartnersModule
    ]
})
export class AdminModule {
}
