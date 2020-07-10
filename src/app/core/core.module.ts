import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '@core/components/layout/header/header.component';
import {FooterComponent} from '@core/components/layout/footer/footer.component';
import {NavbarComponent} from '@core/components/layout/navbar/navbar.component';
import {SidebarComponent} from '@core/components/layout/sidebar/sidebar.component';
import {SharedModule} from '@shared/shared.module';
import {NotFoundComponent} from '@core/components/not-found/not-found.component';
import {DriverAssignmentDialogComponent} from './components/dialogs/driver-assignment-dialog/driver-assignment-dialog.component';
import {ToastrModule} from 'ngx-toastr';
import {SaveRouteDialogComponent} from './components/dialogs/save-route-dialog/save-route-dialog.component';
import {ChangePricesDialogComponent} from './components/dialogs/change-prices-dialog/change-prices-dialog.component';
import {ConfirmationDialogComponent} from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {SaveLocationDialogComponent} from './components/dialogs/save-location-dialog/save-location-dialog.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NotFoundComponent,
    DriverAssignmentDialogComponent,
    SaveRouteDialogComponent,
    ChangePricesDialogComponent,
    ConfirmationDialogComponent,
    SaveLocationDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    NgxMatSelectSearchModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  entryComponents: [
    DriverAssignmentDialogComponent,
    SaveRouteDialogComponent,
    SaveLocationDialogComponent,
    ConfirmationDialogComponent
  ]
})
export class CoreModule {
}
