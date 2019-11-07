import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ACCOMMODATIONS_FOLDER, EDIT_FORM_GALLERY_OPTIONS, SPINNER_DIAMETER} from '@core/constants/settings';
import {AccommodationsService} from '@core/services/accommodations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {CompaniesService} from '@core/services/companies.service';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {Company} from '@shared/models/Company';
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';
import {ACCOMMODATION_FIELDS} from '@core/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '@shared/pipes/redirect-url-generator.pipe';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {NgxGalleryOptions} from 'ngx-gallery';

@Component({
    selector: 'app-save-accommodation',
    templateUrl: './save-accommodation.component.html',
    styleUrls: ['./save-accommodation.component.scss']
})
export class SaveAccommodationComponent implements OnInit, OnDestroy {

    accommodationForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    formFields = ACCOMMODATION_FIELDS;
    subscriptions: Subscription[] = [];
    editCase = !!this.route.snapshot.paramMap.get('id');
    formAction = this.editCase ? 'update' : 'add';
    redirectUrl = this.getRedirectUrl.transform('accommodations');

    companies: Company[] = [];

    @ViewChild('searchAddress')
    searchElementRef: ElementRef;
    options = {types: ['geocode']};

    dropZoneFiles: File[] = [];
    imgPath: string;
    countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES;

    dropzoneConfig = {
        maxFiles: 10
    };

    accommodationData;
    galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;

    constructor(
        private _accommodation: AccommodationsService,
        private _companies: CompaniesService,
        public router: Router,
        public common: CommonService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
        private checkFormData: CheckFormDataPipe,
        private _formMsg: ShowFormMessagePipe,
        public auth: AuthService,
        private formData: BuildFormDataPipe,
        private getRedirectUrl: RedirectUrlGeneratorPipe
    ) {

    }

    ngOnInit(): void {

        this.setFormFields();
        this.common.dataLoading = true;
        this.subscriptions.push(this.route.data.subscribe(dt => {

            // Getting companies list
            this.getCompanies(dt['accommodation']);


            // Preparing the edit form for updating info case
            if (this.editCase) {
                this.editFormPreparations(dt['accommodation']);
            }

            this.common.dataLoading = false;

        }));
    }

    /**
     * Prepares edit form fields & data
     * @param dt route data
     */
    editFormPreparations(dt): void {
        this.formFields['id'] = '';
        this.setFormFields();
        this.addressCtrl.disable();
        this.accommodationData = dt;
        this.accommodationForm.patchValue(dt);
        if (dt['img']) {
            this.imgPath = ACCOMMODATIONS_FOLDER + dt['img'];
        }
    }

    /**
     * Setting form fields with provided object
     */
    setFormFields(): void {
        this.accommodationForm = this._fb.group(this.formFields);
    }


    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress(): void {
        this.accommodationForm.patchValue({'address': ''});
        this.addressCtrl.enable();
    }

    /**
     * Gets activity provider companies list
     */
    getCompanies(accommodationData): void {
        this.subscriptions.push(this._companies.get({name: 'accommodation'}).subscribe((dt: Company[]) => {
            this.companies = dt;
            this.checkFormData.transform('accommodation', accommodationData, this.companies, this.editCase);
        }));
    }

    /**
     * Adds/updates food drink info
     * @param address food-drink address
     */
    save(address): void {
        // if (this.accommodationForm.valid) {
        console.log(this.dropZoneFiles)
        this.common.formProcessing = true;
        const formData = this.formData.transform({
            ...this.accommodationForm.value,
            address: address.el.nativeElement.value
        }, this.dropZoneFiles);

        this._accommodation[this.formAction](formData).subscribe(() => {
            this._formMsg.transform('accommodation', this.editCase, this.redirectUrl);
        });
        // }
    }

    getFile(e): void {
        this.dropZoneFiles.push(e);
    }

    removeSavedImg(): void {
        this.imgPath = '';
        this.accommodationForm.patchValue({'img': ''});
    }

    get nameCtrl(): AbstractControl {
        return this.accommodationForm.get('lat');
    }

    get latCtrl(): AbstractControl {
        return this.accommodationForm.get('lat');
    }

    get lngCtrl(): AbstractControl {
        return this.accommodationForm.get('lng');
    }

    get addressCtrl(): AbstractControl {
        return this.accommodationForm.get('address');
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


}
