import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FerryService} from '@core/services/ferry.service';
import {PartnerService} from '@core/services/partner.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
    ALLOWED_COUNTRIES,
    DEFAULT_COUNTRY,
    FERRIES_FOLDER,
    SPINNER_DIAMETER
} from '@core/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '@core/services/common.service';
import {Ferry} from '@shared/models/Ferry';
import {Partner} from '@shared/models/Partner';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {Company} from '@shared/models/Company';
import {CompaniesService} from '@core/services/companies.service';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';
import {FERRY_FIELDS} from '@core/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '@shared/pipes/redirect-url-generator.pipe';
import {DropzoneConfig} from 'ngx-dropzone-wrapper';
import {NgxGalleryOptions} from 'ngx-gallery';


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
    dropZoneFiles = [];
    imgPath;
    formAction: string;
    dropzoneIndividualConfig = {maxFiles: 5};
    coverShown = true;
    galleryOptions: NgxGalleryOptions[] = [
        {
            'image': false, 'height': '100px',
            'previewFullscreen': true,
            'width': '50%',
            'previewKeyboardNavigation': true,
            'imageDescription': true,
            'previewCloseOnEsc': true,
            'thumbnailActions': [
                {
                    icon: 'fa fa-times-circle', onClick: this.removeImage.bind(this), titleText: 'delete'
                },
                {
                    icon: 'fa fa-star', onClick: this.makeCover.bind(this), titleText: 'cover'
                }
            ]
        },
        {'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3},
        // {'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2},
    ];

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
                    this.imgPath = FERRIES_FOLDER + this.ferryData['name'].replace(/ /g, '_') + '/' + this.ferryData['img'];
                    this.getCoverImgFromList();
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
        }, this.dropZoneFiles);


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
    getFiles(e) {
        this.dropZoneFiles.push(e);
    }


    /**
     * Removes saved drop zone image
     */
    removeSavedImg() {
        this.imgPath = '';
        this.ferryForm.patchValue({'img': ''});
    }

    removeImage(event, index): void {
        // this.ferryData.images.splice(index, 1);
        const image = this.ferryData.images.find((img, ind) => ind === index);

        this._ferries.removeImage({
            id: this.ferryData.id,
            folder: this.ferryData.folder,
            file: image['big'].split('/').pop()
        }).subscribe(d => {
            this.ferryData = d;
        });
    }

    /**
     * Marks the selected image as cover
     * @param event
     * @param index
     */
    makeCover(event, index) {

        // Removing previous images marked as cover
        const coverImg = document.querySelector('.coverStar');
        if (coverImg) {
            coverImg.classList.remove('coverStar');
        }

        // Getting current star icon and marking it as selected
        const el = event.target;
        el.classList.add('coverStar');


        const image = this.ferryData.images.find((img, ind) => ind === index);
        if (image) {
            this.imgPath = image['big'];
            let p = this.imgPath.split('/').pop();
            this._ferries.makeCover({img: p, id: this.ferryData.id}).subscribe(dt => {
                this.toastr.success('The selected image was set as cover successfully');
            });
        }
    }

    getCoverImgFromList() {
        // console.log(this.imgPath)
        // console.log(document.querySelector('.ngx-gallery-thumbnails'));
    }

    getCompany() {
        return this.auth.checkRoles('admin') ? '' : this.auth.userData.company.id;
    }


    changed(e) {
        this.ferryForm.patchValue({'phone': e.target.value});
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

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
