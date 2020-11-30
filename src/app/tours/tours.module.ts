import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToursRoutingModule} from './tours-routing.module';
import {ShowToursComponent} from './show-tours/show-tours.component';
import {SharedModule} from '@shared/shared.module';
import {SaveTourComponent} from './save-tour/save-tour.component';
import {ShowTourTypesComponent} from './show-tour-types/show-tour-types.component';
import {SaveTourTypeComponent} from './save-tour-type/save-tour-type.component';
import { ToursHomeComponent } from './tours-home/tours-home.component';
import { ToursHeaderComponent } from './tours-header/tours-header.component';
import { SearchToursFormComponent } from './search-tours-form/search-tours-form.component';
import { ToursSingleComponent } from './tours-single/tours-single.component';
import { ToursListComponent } from './tours-list/tours-list.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';

@NgModule({
    declarations: [
        ShowToursComponent,
        SaveTourComponent,
        ShowTourTypesComponent,
        SaveTourTypeComponent,
        ToursHomeComponent,
        ToursHeaderComponent,
        SearchToursFormComponent,
        ToursSingleComponent,
        ToursListComponent,
        ShowOrdersComponent
    ],
    imports: [
        CommonModule,
        ToursRoutingModule,
        SharedModule
    ],
    exports: [
        ShowToursComponent,
        SaveTourComponent,
        ShowTourTypesComponent,
        SaveTourTypeComponent,
        ToursHeaderComponent
    ]
})
export class ToursModule {
}
