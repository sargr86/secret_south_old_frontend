import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FerryService} from '../../shared/services/ferry.service';
import {PartnerService} from '../../shared/services/partner.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
    ALLOWED_COUNTRIES,
    DEFAULT_COUNTRY,
    FERRIES_FOLDER,
    FOOD_DRINK_FOLDER,
    SPINNER_DIAMETER
} from '../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {Ferry} from '../../shared/models/Ferry';
import {Partner} from '../../shared/models/Partner';
import {CheckFormDataPipe} from '../../shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {Company} from '../../shared/models/Company';
import {CompaniesService} from '../../shared/services/companies.service';
import {ShowFormMessagePipe} from '../../shared/pipes/show-form-message.pipe';
import {BuildFormDataPipe} from '../../shared/pipes/build-form-data.pipe';
import {FERRY_FIELDS} from '../../shared/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '../../shared/pipes/redirect-url-generator.pipe';


@Component({
    selector: 'app-save-ferry',
    templateUrl: './save-ferry.component.html',
    styleUrls: ['./save-ferry.component.scss']
})
export class SaveFerryComponent implements OnInit, OnDestroy {

    ferryForm: FormGroup;
    ferryData: Ferry;
    spinnerDiameter = SPINNER_DIAMETER;
    partners: Partner[] = [];
    editCase = false;
    redirectUrl = this.getRedirectUrl.transform('ferries');
    allowedCountries = ALLOWED_COUNTRIES;
    defaultCountry = DEFAULT_COUNTRY;
    options = {types: ['geocode']};
    ferryFields = FERRY_FIELDS;
    dropZoneFile;
    imgPath;
    formAction: string;

    companies: Company[] = [];
    subscriptions: Subscription[] = [];

    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;


    constructor(
        private _fb: FormBuilder,
        private _ferries: FerryService,
        private _partner: PartnerService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public common: CommonService,
        private checkFormData: CheckFormDataPipe,
        private _companies: CompaniesService,
        public auth: AuthService,
        private _formMsg: ShowFormMessagePipe,
        private formData: BuildFormDataPipe,
        private getRedirectUrl: RedirectUrlGeneratorPipe
    ) {
    }

    ngOnInit() {
        this.ferryForm = this._fb.group(this.ferryFields);
        this.common.dataLoading = true;
        this.subscriptions.push(this.route.data.subscribe(dt => {
            this.getCompanies();
            if (this.route.snapshot.paramMap.get('id')) {
                this.ferryData = dt['oneFerry'];
                this.ferryFields['id'] = '';
                this.ferryForm = this._fb.group(this.ferryFields);
                this.editCase = true;
                if (this.ferryData) {
                    this.ferryForm.patchValue(this.ferryData);
                    this.addressCtrl.disable();
                }
                if (this.ferryData['img']) {
                    this.imgPath = FERRIES_FOLDER + this.ferryData['img'];
                }
            }
            this.formAction = this.editCase ? 'update' : 'add';
            this.common.dataLoading = false;
        }));

    }

    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress() {
        this.ferryForm.patchValue({'address': ''});
        this.addressCtrl.enable();
    }

    /**
     * Adds or updates a ferry info
     * @param address ferry address
     */
    saveFerry(address) {

        this.common.formProcessing = true;
        const formData = this.formData.transform({
            ...this.ferryForm.value,
            address: address.el.nativeElement.value.replace(/\r?\n|\r/g, '')
        }, this.dropZoneFile);


        // if (this.ferryForm.valid) {
            this.subscriptions.push(this._ferries[this.formAction](formData).subscribe(() => {
                this._formMsg.transform('ferry', this.editCase, this.redirectUrl);
            }));


        // }
    }

    /**
     * Gets ferry companies list
     */
    getCompanies() {
        this.subscriptions.push(this._companies.get({name: 'ferries'}).subscribe((dt: Company[]) => {
            this.companies = dt;
            this.checkFormData.transform('ferry', this.ferryData, this.companies, this.editCase);
        }));
    }

    /**
     * Gets drop zone file
     * @param e the file
     */
    getFile(e) {
        this.dropZoneFile = e;
    }


    /**
     * Removes saved drop zone image
     */
    removeSavedImg() {
        this.imgPath = '';
        this.ferryForm.patchValue({'img': ''});
    }

    get nameCtrl() {
        return this.ferryForm.get('name');
    }

    get latCtrl() {
        return this.ferryForm.get('lat');
    }

    get lngCtrl() {
        return this.ferryForm.get('lng');
    }

    get addressCtrl() {
        return this.ferryForm.get('address');
    }

    get phoneCtrl() {
        return this.ferryForm.get('phone');
    }

    get maxCtrl() {
        return this.ferryForm.get('max_people');
    }

    get minCtrl() {
        return this.ferryForm.get('min_people');
    }

    get companyCtrl(): AbstractControl {
        return this.ferryForm.get('company_id');
    }

    getCompany() {
        return this.auth.checkRoles('admin') ? '' : this.auth.userData.company.id;
    }


    changed(e) {
        this.ferryForm.patchValue({'phone': e.target.value});
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
