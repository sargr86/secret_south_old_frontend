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

@Component({
    selector: 'app-save-food-drink',
    templateUrl: './save-food-drink.component.html',
    styleUrls: ['./save-food-drink.component.scss']
})
export class SaveFoodDrinkComponent implements OnInit, OnDestroy {
    foodDrinkForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    foodDrinkData;
    formFields = {
        name: ['', Validators.required],
        lat: ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
        lng: ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
        description: ['', Validators.required],
        address: ['', Validators.required],
        partner_id: ['', Validators.required]
    };
    partners: Partner[] = [];
    redirectUrl = this.auth.checkRoles('admin') ? 'admin/food-drink' : 'partners/food-drink';
    editCase = false;

    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;

    options = {types: ['geocode']};

    routeDataSubscription: Subscription;
    partnersSubscription: Subscription;


    constructor(
        private _fb: FormBuilder,
        private _foodDrink: FoodDrinkService,
        public common: CommonService,
        public router: Router,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private checkFormData: CheckFormDataPipe,
        public auth: AuthService
    ) {
        this.foodDrinkForm = this._fb.group(this.formFields);
        this.common.dataLoading = true;
        this.routeDataSubscription = this.route.data.subscribe(dt => {
            this.getPartners();
            if (this.route.snapshot.paramMap.get('id')) {
                this.foodDrinkData = dt['oneFoodDrink'];
                this.formFields['id'] = '';
                this.foodDrinkForm = this._fb.group(this.formFields);
                this.foodDrinkForm.patchValue(this.foodDrinkData);
                this.editCase = true;
                this.addressCtrl.disable();
            }
        });
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
     * Gets partners list
     */
    getPartners() {
        this.partnersSubscription = this._foodDrink.getPartners().subscribe((d: any) => {
            this.partners = d;
            this.checkFormData.transform('food drink', this.foodDrinkData, this.partners, this.editCase);
            this.common.dataLoading = false;
        });
    }

    /**
     * Adds/updates food drink info
     * @param address food-drink address
     */
    saveFoodDrink(address) {
        const formValue = this.foodDrinkForm.value;
        formValue.address = address.el.nativeElement.value;

        // if (this.editFerryForm.valid) {
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
        if (this.routeDataSubscription) {
            this.routeDataSubscription.unsubscribe();
        }
        if (this.partnersSubscription) {
            this.partnersSubscription.unsubscribe();
        }
    }

}
