import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './modules/material.module';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {GetTableDataSourcePipe} from './pipes/get-table-data-source.pipe';
import {MatReusableTableComponent} from './components/mat-reusable-table/mat-reusable-table.component';
import {InternationalPhoneNumberModule} from 'ngx-international-phone-number';
import {DROPZONE_CONFIG, DropzoneModule} from 'ngx-dropzone-wrapper';
import {DEFAULT_DROPZONE_CONFIG} from './constants/settings';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardTemplateComponent} from './components/dashboard-template/dashboard-template.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {CheckFormDataPipe} from './pipes/check-form-data.pipe';
import {MainDashboardComponent} from './components/main-dashboard/main-dashboard.component';
import {GetImageUrlPipe} from './pipes/get-image-url.pipe';
import { InvitationFormComponent } from './components/invitation-form/invitation-form.component';

@NgModule({
    declarations: [
        ConfirmationDialogComponent,
        GetTableDataSourcePipe,
        MatReusableTableComponent,
        DashboardTemplateComponent,
        CheckFormDataPipe,
        MainDashboardComponent,
        GetImageUrlPipe,
        InvitationFormComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        InternationalPhoneNumberModule,
        DropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        GooglePlaceModule
    ],
    providers: [
        GetTableDataSourcePipe,
        CheckFormDataPipe,
        GetImageUrlPipe,
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
    exports: [
        MaterialModule,
        InternationalPhoneNumberModule,
        DropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        GooglePlaceModule,
        GetTableDataSourcePipe,
        GetImageUrlPipe,
        MatReusableTableComponent,
        DashboardTemplateComponent,
        MainDashboardComponent,
        GetImageUrlPipe,
        InvitationFormComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class SharedModule {
}
