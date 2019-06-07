import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FerryService} from '../../shared/services/ferry.service';
import {PartnerService} from '../../shared/services/partner.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ALLOWED_COUNTRIES, DEFAULT_COUNTRY, SPINNER_DIAMETER} from '../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {patternValidator} from '../../shared/helpers/pattern-validator';
import {
    LATITUDE_PATTERN,
    LONGITUDE_PATTERN,
} from '../../shared/constants/patterns';
import {Ferry} from '../../shared/models/Ferry';
import {Partner} from '../../shared/models/Partner';
import {CheckFormDataPipe} from '../../shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {Company} from '../../shared/models/Company';
import {CompaniesService} from '../../shared/services/companies.service';


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
    redirectUrl = this.auth.checkRoles('admin') ? 'admin/ferries' : 'partners/ferries';
    allowedCountries = ALLOWED_COUNTRIES;
    defaultCountry = DEFAULT_COUNTRY;
    options = {types: ['geocode']};
    ferryFields = {
        'name': ['', Validators.required],
        'max_people': ['', Validators.required],
        'min_people': [5, Validators.required],
        'lat': ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
        'lng': ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
        'phone': ['', [Validators.required]],
        'address': ['', Validators.required],
        'company_id': [this.getCompany(), Validators.required]

    };

    companies: Company[] = [];
    subscriptions: Subscription[] = [];

    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;


    constructor(
        private _fb: FormBuilder,
        private _ferry: FerryService,
        private _partner: PartnerService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public common: CommonService,
        private checkFormData: CheckFormDataPipe,
        private _companies: CompaniesService,
        public auth: AuthService
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
            }
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
     * @param searchAddress ferry address
     */
    saveFerry(searchAddress) {
        const formValue = this.ferryForm.value;
        formValue.address = searchAddress.el.nativeElement.value.replace(/\r?\n|\r/g, '');


        // if (this.ferryForm.valid) {
        this.common.formProcessing = true;
        if (this.editCase) {
            this._ferry.update(formValue).subscribe(() => {
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The ferry info has been updated successfully', 'Updated!');
                this.common.formProcessing = false;
            });
        } else {
            this._ferry.insertFerry(formValue).subscribe(() => {
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The ferry info has been added successfully', 'Added!');
                this.common.formProcessing = false;
            });
        }


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
