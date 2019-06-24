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
import {GetImageUrlPipe} from './pipes/get-image-url.pipe';
import {InvitationFormComponent} from './components/invitation-form/invitation-form.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {FormTitleComponent} from './components/form-title/form-title.component';
import {ShowFormMessagePipe} from './pipes/show-form-message.pipe';
import {BuildFormDataPipe} from './pipes/build-form-data.pipe';
import {BookingFormComponent} from './components/booking-form/booking-form.component';
import {NumberPickerModule} from 'ng-number-picker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
    declarations: [
        ConfirmationDialogComponent,
        GetTableDataSourcePipe,
        MatReusableTableComponent,
        DashboardTemplateComponent,
        CheckFormDataPipe,
        GetImageUrlPipe,
        InvitationFormComponent,
        EditProfileComponent,
        FormTitleComponent,
        ShowFormMessagePipe,
        BuildFormDataPipe,
        BookingFormComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        InternationalPhoneNumberModule,
        DropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        GooglePlaceModule,
        NumberPickerModule,
        NgxMaterialTimepickerModule
    ],
    providers: [
        GetTableDataSourcePipe,
        CheckFormDataPipe,
        GetImageUrlPipe,
        ShowFormMessagePipe,
        BuildFormDataPipe,
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
        NumberPickerModule,
        GetTableDataSourcePipe,
        GetImageUrlPipe,
        MatReusableTableComponent,
        DashboardTemplateComponent,
        GetImageUrlPipe,
        InvitationFormComponent,
        EditProfileComponent,
        FormTitleComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent,
        BookingFormComponent
    ]
})
export class SharedModule {
}
