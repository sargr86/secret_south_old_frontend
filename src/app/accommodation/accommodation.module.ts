import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccommodationRoutingModule} from './accommodation-routing.module';
import {SaveAccommodationComponent} from './save-accommodation/save-accommodation.component';
import {ShowAccommodationsComponent} from './show-accommodations/show-accommodations.component';
import {SharedModule} from '../shared/shared.module';
import { AccommodationsHomeComponent } from './accommodations-home/accommodations-home.component';
import { AccommodationsHeaderComponent } from './accommodations-header/accommodations-header.component';
import { AccommodationsListComponent } from './accommodations-list/accommodations-list.component';

@NgModule({
    declarations: [
        SaveAccommodationComponent,
        ShowAccommodationsComponent,
        AccommodationsHomeComponent,
        AccommodationsHeaderComponent,
        AccommodationsListComponent
    ],
    imports: [
        CommonModule,
        AccommodationRoutingModule,
        SharedModule
    ],
    exports: [
        SaveAccommodationComponent,
        ShowAccommodationsComponent,
        AccommodationsHeaderComponent
    ],
})
export class AccommodationModule {
}
