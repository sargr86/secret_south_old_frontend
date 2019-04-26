import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {Partner} from '../../../shared/models/Partner';
import {AccommodationsService} from '../../../shared/services/accommodations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {CheckFormDataPipe} from '../../../shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {patternValidator} from '../../../shared/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '../../../shared/constants/patterns';

@Component({
    selector: 'app-save-accommodation',
    templateUrl: './save-accommodation.component.html',
    styleUrls: ['./save-accommodation.component.scss']
})
export class SaveAccommodationComponent implements OnInit, OnDestroy {

    accommodationForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    accommodationData;
    formFields = {
        name: ['', Validators.required],
        lat: ['', Validators.required, patternValidator(LATITUDE_PATTERN)],
        lng: ['', Validators.required, patternValidator(LONGITUDE_PATTERN)],
        description: [''],
        address: ['', Validators.required],
        partner_id: ['', Validators.required]
    };
    partners: Partner[] = [];
    redirectUrl = 'admin/all_accommodations';
    editCase = false;

    routeDataSubscription: Subscription;
    partnersSubscription: Subscription;

    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;

    options = {types: ['geocode']};

    constructor(
        private _accommodation: AccommodationsService,
        public router: Router,
        public common: CommonService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
        private checkFormData: CheckFormDataPipe
    ) {
    }

    ngOnInit() {
        this.accommodationForm = this._fb.group(this.formFields);
        this.common.dataLoading = true;
        this.routeDataSubscription = this.route.data.subscribe(dt => {
            this.getPartners();
            if (this.route.snapshot.paramMap.get('id')) {
                this.accommodationData = dt['oneAccommodation'];
                this.formFields['id'] = '';
                this.accommodationForm = this._fb.group(this.formFields);
                this.editCase = true;
                if (this.accommodationData) {
                    this.accommodationForm.patchValue(this.accommodationData);
                    this.addressCtrl.disable();
                }
            }

        });
    }


    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress() {
        this.accommodationForm.patchValue({'address': ''});
        this.addressCtrl.enable();
    }

    /**
     * Gets partners list
     */
    getPartners() {
        this.partnersSubscription = this._accommodation.getPartners().subscribe((d: any) => {
            this.partners = d;
            this.common.dataLoading = false;
            this.checkFormData.transform('accommodation', this.accommodationData, this.partners, this.editCase);
        });
    }

    /**
     * Adds/updates food drink info
     * @param address food-drink address
     */
    saveFoodDrink(address) {
        const formValue = this.accommodationForm.value;
        formValue.address = address.el.nativeElement.value;

        // if (this.editFerryForm.valid) {
        this.common.formProcessing = true;
        if (this.editCase) {
            this._accommodation.update(formValue).subscribe(() => {
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The accommodation info has been updated successfully', 'Updated!');
                this.common.formProcessing = false;
            });
        } else {
            this._accommodation.add(formValue).subscribe(() => {
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The accommodation info has been added successfully', 'Added!');
                this.common.formProcessing = false;
            });
        }


        // }
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
        if (this.routeDataSubscription) {
            this.routeDataSubscription.unsubscribe();
        }
        if (this.partnersSubscription) {
            this.partnersSubscription.unsubscribe();
        }
        this.toastr.clear();
    }


}
