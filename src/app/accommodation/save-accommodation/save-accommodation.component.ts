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
import {patternValidator} from '../../shared/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '../../shared/constants/patterns';
import {AuthService} from '../../shared/services/auth.service';
import {CompaniesService} from '../../shared/services/companies.service';
import {ShowFormMessagePipe} from '../../shared/pipes/show-form-message.pipe';
import {Company} from '../../shared/models/Company';
import {BuildFormDataPipe} from '../../shared/pipes/build-form-data.pipe';

@Component({
    selector: 'app-save-accommodation',
    templateUrl: './save-accommodation.component.html',
    styleUrls: ['./save-accommodation.component.scss']
})
export class SaveAccommodationComponent implements OnInit, OnDestroy {

    accommodationForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    formFields = {
        name: ['', Validators.required],
        lat: ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
        lng: ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
        description: [''],
        address: ['', Validators.required],
        company_id: ['', Validators.required],
        folder: 'accommodations'
    };
    partners: Partner[] = [];
    redirectUrl = (this.auth.checkRoles('admin') ? 'admin' : 'partners') + '/accommodations';
    editCase = !!this.route.snapshot.paramMap.get('id');

    companies: Company[] = [];

    @ViewChild('searchAddress')
    searchElementRef: ElementRef;

    options = {types: ['geocode']};
    formAction = this.editCase ? 'update' : 'add';
    subscriptions: Subscription[] = [];
    dropZoneFile: File;
    imgPath: string;

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
        private formData: BuildFormDataPipe
    ) {

    }

    ngOnInit() {

        this.setFormFields();
        this.common.dataLoading = true;
        this.subscriptions.push(this.route.data.subscribe(dt => {

            // Getting companies list
            this.getCompanies();

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
    editFormPreparations(dt) {
        this.formFields['id'] = '';
        this.setFormFields();
        this.addressCtrl.disable();
        this.accommodationForm.patchValue(dt);
        if (dt['img']) {
            this.imgPath = ACCOMMODATIONS_FOLDER + dt['img'];
        }
        console.log(this.imgPath)
    }

    // Setting form fields with provided object
    setFormFields() {
        this.accommodationForm = this._fb.group(this.formFields);
    }


    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress() {
        this.accommodationForm.patchValue({'address': ''});
        this.addressCtrl.enable();
    }

    /**
     * Gets activity provider companies list
     */
    getCompanies() {
        this.subscriptions.push(this._companies.get({name: 'accommodations'}).subscribe((dt: Company[]) => this.companies = dt));
    }

    /**
     * Adds/updates food drink info
     * @param address food-drink address
     */
    save(address) {
        if (this.accommodationForm.valid) {

            this.common.formProcessing = true;
            const formData = this.formData.transform({
                ...this.accommodationForm.value,
                address: address.el.nativeElement.value
            }, this.dropZoneFile);

            this._accommodation[this.formAction](formData).subscribe(() => {
                this._formMsg.transform('accommodation', this.editCase, this.redirectUrl);
            });
        }
    }

    getFile(e) {
        this.dropZoneFile = e;
    }

    removeSavedImg() {
        this.imgPath = '';
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
