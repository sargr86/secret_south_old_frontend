import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FerryService} from '../../services/ferry.service';
import {PartnerService} from '../../services/partner.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ALLOWED_COUNTRIES, DEFAULT_COUNTRY, SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../shared/services/common.service';
import {patternValidator} from '../../../shared/helpers/pattern-validator';
import {
    EMAIL_PATTERN,
    LATITUDE_PATTERN,
    LONGITUDE_PATTERN,
} from '../../../shared/constants/patterns';
import {MapsAPILoader} from '@agm/core';
import {Ferry} from '../../../shared/models/Ferry';
import {Partner} from '../../../shared/models/Partner';

@Component({
    selector: 'app-save-ferry',
    templateUrl: './save-ferry.component.html',
    styleUrls: ['./save-ferry.component.scss']
})
export class SaveFerryComponent implements OnInit {

    editFerryForm: FormGroup;
    ferryData: Ferry;
    spinnerDiameter = SPINNER_DIAMETER;
    partners: Partner[] = [];
    editCase = false;
    redirectUrl = 'admin/all_ferries';
    allowedCountries = ALLOWED_COUNTRIES;
    defaultCountry = DEFAULT_COUNTRY;
    partnerTypes: any = [];

    ferryFields = {
        'name': ['', Validators.required],
        'email': ['', [Validators.required, patternValidator(EMAIL_PATTERN)]],
        'max_people': ['', Validators.required],
        'min_people': [5, Validators.required],
        'lat': ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
        'lng': ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
        'phone': ['', [Validators.required]],
        'address': ['', Validators.required],
        'type': '',
        'partner_id': ['', Validators.required]
    };

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
        private mapsAPILoader: MapsAPILoader
    ) {
    }

    ngOnInit() {
        this.editFerryForm = this._fb.group(this.ferryFields);
        this.common.dataLoading = true;
        this.route.data.subscribe(dt => {
            this.getPartners();
            if (this.route.snapshot.paramMap.get('id')) {
                this.ferryData = dt['oneFerry'];
                this.ferryFields['id'] = '';
                this.editFerryForm = this._fb.group(this.ferryFields);
                this.editFerryForm.patchValue(this.ferryData);
                this.editCase = true;

            }
        });

        this._partner.getTypes().subscribe(types => {
            this.partnerTypes = types;
            this.mapsAPILoader.load().then(() => {
                if (this.searchElementRef) {
                    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
                    this.common.dataLoading = false;
                }
            });
        });

    }

    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress() {
        this.editFerryForm.patchValue({'address': ''});
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
        });
    }

    /**
     * Adds or updates a ferry info
     * @param searchAddress ferry address
     */
    saveFerry(searchAddress) {
        const formValue = this.editFerryForm.value;
        formValue.address = searchAddress.value.replace(/\r?\n|\r/g, '');


        // if (this.editFerryForm.valid) {
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
     * Gets partners list
     */
    getPartners() {
        this._ferry.getAllpartner().subscribe((d: any) => {
            this.partners = d;
            this.common.dataLoading = false;
        });
    }


    get nameCtrl() {
        return this.editFerryForm.get('name');
    }

    get emailCtrl() {
        return this.editFerryForm.get('email');
    }

    get latCtrl() {
        return this.editFerryForm.get('lat');
    }

    get lngCtrl() {
        return this.editFerryForm.get('lng');
    }

    get addressCtrl() {
        return this.editFerryForm.get('address');
    }

    get phoneCtrl() {
        return this.editFerryForm.get('phone');
    }

    get maxCtrl() {
        return this.editFerryForm.get('max_people');
    }

    get minCtrl() {
        return this.editFerryForm.get('min_people');
    }


    changed(e) {
        console.log(e.target.value)
        this.editFerryForm.patchValue({'phone': e.target.value});
    }

}
