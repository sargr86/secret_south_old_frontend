import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '@core/components/layout/header/header.component';
import {FooterComponent} from '@core/components/layout/footer/footer.component';
import {NavbarComponent} from '@core/components/layout/navbar/navbar.component';
import {SidebarComponent} from '@core/components/layout/sidebar/sidebar.component';
import {SharedModule} from '@shared/shared.module';
import {NotFoundComponent} from '@core/components/not-found/not-found.component';
import {API_URL} from '@core/constants/settings';
import {DriverAssignmentDialogComponent} from './components/dialogs/driver-assignment-dialog/driver-assignment-dialog.component';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NotFoundComponent,
    DriverAssignmentDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    })
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  entryComponents: [
    DriverAssignmentDialogComponent
  ]
})
export class CoreModule {
}
