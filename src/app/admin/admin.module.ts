import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule
} from '@angular/material';

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
import {MaterialModule} from "../shared/modules/material.module";
import {SharedModule} from "../shared/shared.module";
import { EditFerryComponent } from './edit-ferry/edit-ferry.component';
import { ShowFerriesComponent } from './ferry/show-ferries/show-ferries.component';
import { SaveFerryComponent } from './ferry/save-ferry/save-ferry.component';

@NgModule({
    declarations: [DashboardComponent, AddFerryComponent, AllFerryComponent, AddToursComponent, AllToursComponent, AddToursTypeComponent, AllToursTypeComponent, AddFoodDrinkComponent, AllFoodDrinkComponent, AddPartnerComponent, AllPartnerComponent, GpsLocationComponent, EditFerryComponent, ShowFerriesComponent, SaveFerryComponent],
    imports: [
        CommonModule,

        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        // MatTreeModule,
        // MatIconModule,
        // MatProgressBarModule,
        // MatButtonModule,
        // MatSidenavModule,
        // MatInputModule,
        // MatTableModule,
        // MatSortModule,
        // MatPaginatorModule,
        // MatSelectModule,
        SharedModule
    ]
})
export class AdminModule {
}
