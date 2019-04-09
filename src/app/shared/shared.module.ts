import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './modules/material.module';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {GetTableDataSourcePipe} from './pipes/get-table-data-source.pipe';
import {MatReusableTableComponent} from './components/mat-reusable-table/mat-reusable-table.component';
import {InternationalPhoneNumberModule} from 'ngx-international-phone-number';
import {DROPZONE_CONFIG, DropzoneModule} from 'ngx-dropzone-wrapper';
import {DEFAULT_DROPZONE_CONFIG} from './constants/settings';


@NgModule({
    declarations: [
        ConfirmationDialogComponent,
        GetTableDataSourcePipe,
        MatReusableTableComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        InternationalPhoneNumberModule,
        DropzoneModule
    ],
    providers: [
        GetTableDataSourcePipe,
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
    exports: [
        MaterialModule,
        InternationalPhoneNumberModule,
        DropzoneModule,
        GetTableDataSourcePipe,
        MatReusableTableComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class SharedModule {
}
