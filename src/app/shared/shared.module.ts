import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@core/modules/material.module';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {GetTableDataSourcePipe} from './pipes/get-table-data-source.pipe';
import {MatReusableTableComponent} from './components/mat-reusable-table/mat-reusable-table.component';
import {InternationalPhoneNumberModule} from 'ngx-international-phone-number';
import {DROPZONE_CONFIG, DropzoneModule} from 'ngx-dropzone-wrapper';
import {DEFAULT_DROPZONE_CONFIG, GOOGLE_API_KEY} from '@core/constants/settings';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {RedirectUrlGeneratorPipe} from './pipes/redirect-url-generator.pipe';
import {DropzoneComponent} from './components/dropzone/dropzone.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxGalleryModule} from 'ngx-gallery';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CarouselHolderComponent} from './components/carousel-holder/carousel-holder.component';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {MainSectionsComponent} from './components/main-sections/main-sections.component';
import {Ng5SliderModule} from 'ng5-slider';
import {ProgressBarModule} from 'angular-progress-bar';
import {FiltersBarComponent} from './components/filters-bar/filters-bar.component';
import {GetFileBasenamePipe} from './pipes/get-file-basename.pipe';
import {MarkSelectedCoverImagePipe} from './pipes/mark-selected-cover-image.pipe';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    GetTableDataSourcePipe,
    MatReusableTableComponent,
    CheckFormDataPipe,
    GetImageUrlPipe,
    InvitationFormComponent,
    EditProfileComponent,
    FormTitleComponent,
    ShowFormMessagePipe,
    BuildFormDataPipe,
    BookingFormComponent,
    RedirectUrlGeneratorPipe,
    DropzoneComponent,
    CarouselHolderComponent,
    MainSectionsComponent,
    FiltersBarComponent,
    GetFileBasenamePipe,
    MarkSelectedCoverImagePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InternationalPhoneNumberModule,
    DropzoneModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NumberPickerModule,
    NgxMaterialTimepickerModule,
    NgxGalleryModule,
    CarouselModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY,
      libraries: ['places', 'geometry'],
    }),
    AgmDirectionModule,
    Ng5SliderModule,
    ProgressBarModule
  ],
  providers: [
    GetTableDataSourcePipe,
    CheckFormDataPipe,
    GetImageUrlPipe,
    ShowFormMessagePipe,
    BuildFormDataPipe,
    GetFileBasenamePipe,
    RedirectUrlGeneratorPipe,
    MarkSelectedCoverImagePipe,
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
    NgSelectModule,
    NumberPickerModule,
    NgxGalleryModule,
    NgxMaterialTimepickerModule,
    CarouselModule,
    AgmCoreModule,
    AgmDirectionModule,
    Ng5SliderModule,
    ProgressBarModule,
    GetTableDataSourcePipe,
    GetImageUrlPipe,
    MatReusableTableComponent,
    InvitationFormComponent,
    EditProfileComponent,
    FormTitleComponent,
    CarouselHolderComponent,
    MainSectionsComponent,
    FiltersBarComponent,
    GetFileBasenamePipe
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    BookingFormComponent
  ]
})
export class SharedModule {
}
