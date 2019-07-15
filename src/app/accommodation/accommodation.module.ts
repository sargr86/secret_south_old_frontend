import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccommodationRoutingModule} from './accommodation-routing.module';
import {SaveAccommodationComponent} from './save-accommodation/save-accommodation.component';
import {ShowAccommodationsComponent} from './show-accommodations/show-accommodations.component';
import {SharedModule} from '../shared/shared.module';
import { AccommodationsHomeComponent } from './accommodations-home/accommodations-home.component';

@NgModule({
    declarations: [
        SaveAccommodationComponent,
        ShowAccommodationsComponent,
        AccommodationsHomeComponent
    ],
    imports: [
        CommonModule,
        AccommodationRoutingModule,
        SharedModule
    ],
    exports: [
        SaveAccommodationComponent,
        ShowAccommodationsComponent
    ],
})
export class AccommodationModule {
}
