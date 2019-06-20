import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Partner} from '../../shared/models/Partner';
import {FoodDrinkService} from '../../shared/services/food-drink.service';
import {CommonService} from '../../shared/services/common.service';
import {SPINNER_DIAMETER} from '../../shared/constants/settings';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CheckFormDataPipe} from '../../shared/pipes/check-form-data.pipe';
import {patternValidator} from '../../shared/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '../../shared/constants/patterns';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {Company} from '../../shared/models/Company';
import {CompaniesService} from '../../shared/services/companies.service';
import {FoodDrink} from '../../shared/models/FoodDrink';

@Component({
    selector: 'app-save-food-drink',
    templateUrl: './save-food-drink.component.html',
    styleUrls: ['./save-food-drink.component.scss']
})
export class SaveFoodDrinkComponent implements OnInit, OnDestroy {
    foodDrinkForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    foodDrinkData: FoodDrink;
    formFields = {
        name: ['', Validators.required],
        lat: ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
        lng: ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
        description: ['', Validators.required],
        address: ['', Validators.required],
        company_id: ['', Validators.required]
    };
    partners: Partner[] = [];
    redirectUrl = this.auth.checkRoles('admin') ? 'admin/food-drink' : 'partners/food-drink';
    editCase = false;

    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;

    options = {types: ['geocode']};

    subscriptions: Subscription[] = [];
    companies: Company[];


    constructor(
        private _fb: FormBuilder,
        private _foodDrink: FoodDrinkService,
        public common: CommonService,
        public router: Router,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private checkFormData: CheckFormDataPipe,
        private _companies: CompaniesService,
        public auth: AuthService
    ) {
        this.foodDrinkForm = this._fb.group(this.formFields);
        this.common.dataLoading = true;
        this.subscriptions.push(this.route.data.subscribe(dt => {
            this.getCompanies();
            if (this.route.snapshot.paramMap.get('id')) {
                this.foodDrinkData = dt['oneFoodDrink'];
                this.formFields['id'] = '';
                this.foodDrinkForm = this._fb.group(this.formFields);
                this.foodDrinkForm.patchValue(this.foodDrinkData);
                this.editCase = true;
                this.addressCtrl.disable();
            }
            this.common.dataLoading = false;
        }));
    }

    ngOnInit() {
    }

    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress() {
        this.foodDrinkForm.patchValue({'address': ''});
        this.addressCtrl.enable();
    }

    /**
     * Gets activity provider companies list
     */
    getCompanies() {
        this.subscriptions.push(this._companies.get({name: 'food/drink'}).subscribe((dt: Company[]) => this.companies = dt));
    }

    /**
     * Adds/updates food drink info
     * @param address food-drink address
     */
    saveFoodDrink(address) {
        const formValue = this.foodDrinkForm.value;
        formValue.address = address.el.nativeElement.value;

        // if (this.ferryForm.valid) {
        this.common.formProcessing = true;
        if (this.editCase) {
            this._foodDrink.update(formValue).subscribe(() => {
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The food drink info has been updated successfully', 'Updated!');
                this.common.formProcessing = false;
            });
        } else {
            this._foodDrink.add(formValue).subscribe(() => {
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The food drink  info has been added successfully', 'Added!');
                this.common.formProcessing = false;
            });
        }


        // }
    }

    get latCtrl() {
        return this.foodDrinkForm.get('lat');
    }

    get lngCtrl() {
        return this.foodDrinkForm.get('lng');
    }

    get addressCtrl() {
        return this.foodDrinkForm.get('address');
    }

    get descCtrl() {
        return this.foodDrinkForm.get('description');
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
