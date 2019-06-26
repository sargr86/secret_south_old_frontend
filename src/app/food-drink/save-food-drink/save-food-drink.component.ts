import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FoodDrinkService} from '../../shared/services/food-drink.service';
import {CommonService} from '../../shared/services/common.service';
import {FERRIES_FOLDER, FOOD_DRINK_FOLDER, SPINNER_DIAMETER} from '../../shared/constants/settings';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CheckFormDataPipe} from '../../shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {Company} from '../../shared/models/Company';
import {CompaniesService} from '../../shared/services/companies.service';
import {FoodDrink} from '../../shared/models/FoodDrink';
import {FOOD_DRINK_FIELDS} from '../../shared/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '../../shared/pipes/redirect-url-generator.pipe';
import {ShowFormMessagePipe} from '../../shared/pipes/show-form-message.pipe';
import {BuildFormDataPipe} from '../../shared/pipes/build-form-data.pipe';

@Component({
    selector: 'app-save-food-drink',
    templateUrl: './save-food-drink.component.html',
    styleUrls: ['./save-food-drink.component.scss']
})
export class SaveFoodDrinkComponent implements OnInit, OnDestroy {
    foodDrinkForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    foodDrinkData: FoodDrink;
    formFields = FOOD_DRINK_FIELDS;
    companies: Company[] = [];
    redirectUrl = this.getRedirectUrl.transform('food-drink');
    subscriptions: Subscription[] = [];
    editCase = false;
    formAction: string;
    dropZoneFile: File;
    imgPath;

    // Address search
    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;
    options = {types: ['geocode']};


    constructor(
        private _fb: FormBuilder,
        private _foodDrink: FoodDrinkService,
        public common: CommonService,
        public router: Router,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private checkFormData: CheckFormDataPipe,
        private _companies: CompaniesService,
        public auth: AuthService,
        private getRedirectUrl: RedirectUrlGeneratorPipe,
        private _formMsg: ShowFormMessagePipe,
        private formData: BuildFormDataPipe
    ) {

        this.foodDrinkForm = this._fb.group(this.formFields);
        this.common.dataLoading = true;
        this.subscriptions.push(this.route.data.subscribe(dt => {
            this.getCompanies();
            if (this.route.snapshot.paramMap.get('id')) {
                this.foodDrinkData = dt['foodDrink'];
                this.formFields['id'] = '';
                this.foodDrinkForm = this._fb.group(this.formFields);
                this.foodDrinkForm.patchValue(this.foodDrinkData);
                this.editCase = true;
                this.addressCtrl.disable();
                if (this.foodDrinkData['img']) {
                    this.imgPath = FOOD_DRINK_FOLDER + this.foodDrinkData['img'];
                }
            }
            this.formAction = this.editCase ? 'update' : 'add';
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
        this.subscriptions.push(this._companies.get({name: 'food/drink'}).subscribe((dt: Company[]) => {
            this.companies = dt;
            this.checkFormData.transform('food/drink', this.foodDrinkData, this.companies, this.editCase);
        }));
    }

    /**
     * Adds/updates food drink info
     * @param address food-drink address
     */
    save(address) {

        // if (this.foodDrinkForm.valid) {
        this.common.formProcessing = true;
        const formData = this.formData.transform({
            ...this.foodDrinkForm.value,
            address: address.el.nativeElement.value
        }, this.dropZoneFile);

        this.subscriptions.push(this._foodDrink[this.formAction](formData).subscribe(() => {
            this._formMsg.transform('food/drink', this.editCase, this.redirectUrl);
        }));


        // }
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
        this.foodDrinkForm.patchValue({'img': ''});
        this.dropZoneFile = null;
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

    get companyCtrl() {
        return this.foodDrinkForm.get('company_id');
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
