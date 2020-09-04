import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccommodationRoutingModule} from './accommodation-routing.module';
import {SaveAccommodationComponent} from './save-accommodation/save-accommodation.component';
import {ShowAccommodationsComponent} from './show-accommodations/show-accommodations.component';
import {SharedModule} from '@shared/shared.module';
import {AccommodationsHomeComponent} from './accommodations-home/accommodations-home.component';
import {AccommodationsHeaderComponent} from './accommodations-header/accommodations-header.component';
import {AccommodationsListComponent} from './accommodations-list/accommodations-list.component';
import {AccommodationSingleComponent} from './accommodation-single/accommodation-single.component';
import {ShowOrdersComponent} from '@app/accommodation/show-orders/show-orders.component';

@NgModule({
  declarations: [
    SaveAccommodationComponent,
    ShowAccommodationsComponent,
    AccommodationsHomeComponent,
    AccommodationsHeaderComponent,
    AccommodationsListComponent,
    AccommodationSingleComponent,
    ShowOrdersComponent
  ],
  imports: [
    CommonModule,
    AccommodationRoutingModule,
    SharedModule,
  ],
  exports: [
    SaveAccommodationComponent,
    ShowAccommodationsComponent,
    AccommodationsHeaderComponent,
    AccommodationsHomeComponent
  ],
})
export class AccommodationModule {
}
