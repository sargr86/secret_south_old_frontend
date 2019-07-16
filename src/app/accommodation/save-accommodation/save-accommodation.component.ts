import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ACCOMMODATIONS_FOLDER, SPINNER_DIAMETER} from '../../shared/constants/settings';
import {Partner} from '../../shared/models/Partner';
import {AccommodationsService} from '../../shared/services/accommodations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {CheckFormDataPipe} from '../../shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {CompaniesService} from '../../shared/services/companies.service';
import {ShowFormMessagePipe} from '../../shared/pipes/show-form-message.pipe';
import {Company} from '../../shared/models/Company';
import {BuildFormDataPipe} from '../../shared/pipes/build-form-data.pipe';
import {ACCOMMODATION_FIELDS} from '../../shared/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '../../shared/pipes/redirect-url-generator.pipe';
import {COUNTRY_RESTRICTED_PLACES} from '../../shared/helpers/google-one-country-places-getter';

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

    dropZoneFile: File;
    imgPath: string;
    countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES;

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
    getCompanies(accommodationData) {
        this.subscriptions.push(this._companies.get({name: 'accommodations'}).subscribe((dt: Company[]) => {
            this.companies = dt;
            this.checkFormData.transform('accommodation', accommodationData, this.companies, this.editCase);
        }));
    }

    /**
     * Adds/updates food drink info
     * @param address food-drink address
     */
    save(address) {
        // if (this.accommodationForm.valid) {

        this.common.formProcessing = true;
        const formData = this.formData.transform({
            ...this.accommodationForm.value,
            address: address.el.nativeElement.value
        }, this.dropZoneFile);

        this._accommodation[this.formAction](formData).subscribe(() => {
            this._formMsg.transform('accommodation', this.editCase, this.redirectUrl);
        });
        // }
    }

    getFile(e) {
        this.dropZoneFile = e;
    }

    removeSavedImg() {
        this.imgPath = '';
        this.accommodationForm.patchValue({'img': ''});
    }

    get nameCtrl() {
        return this.accommodationForm.get('lat');
    }

    get latCtrl() {
        return this.accommodationForm.get('lat');
    }

    get lngCtrl() {
        return this.accommodationForm.get('lng');
    }

    get addressCtrl() {
        return this.accommodationForm.get('address');
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


}
