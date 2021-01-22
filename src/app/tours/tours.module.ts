import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToursRoutingModule} from './tours-routing.module';
import {ShowToursComponent} from './show-tours/show-tours.component';
import {SharedModule} from '@shared/shared.module';
import {ShowTourTypesComponent} from './show-tour-types/show-tour-types.component';
import {SaveTourTypeComponent} from './save-tour-type/save-tour-type.component';
import {ToursHomeComponent} from './tours-home/tours-home.component';
import {ToursHeaderComponent} from './tours-header/tours-header.component';
import {SearchToursFormComponent} from './search-tours-form/search-tours-form.component';
import {ToursSingleComponent} from './tours-single/tours-single.component';
import {ToursListComponent} from './tours-list/tours-list.component';
import {ShowOrdersComponent} from './show-orders/show-orders.component';
import {ShowDailyToursComponent} from './show-daily-tours/show-daily-tours.component';
import {SaveTourFormComponent} from './save-tour-form/save-tour-form.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { DailyToursFiltersComponent } from './show-daily-tours/daily-tours-filters/daily-tours-filters.component';

export function momentAdapterFactory() {
  moment.updateLocale('en', {
    week: {
      dow: 1, // set start of week to monday instead
      doy: 0,
    },
  });
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    ShowToursComponent,
    ShowTourTypesComponent,
    SaveTourTypeComponent,
    ToursHomeComponent,
    ToursHeaderComponent,
    SearchToursFormComponent,
    ToursSingleComponent,
    ToursListComponent,
    ShowOrdersComponent,
    ShowDailyToursComponent,
    SaveTourFormComponent,
    DailyToursFiltersComponent
  ],
  imports: [
    CommonModule,
    ToursRoutingModule,
    SharedModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: momentAdapterFactory}),
  ],
  exports: [
    ShowToursComponent,
    ShowTourTypesComponent,
    SaveTourTypeComponent,
    ToursHeaderComponent
  ]
})
export class ToursModule {
}
