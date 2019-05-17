import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Partner} from '../../shared/models/Partner';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../shared/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '../../shared/constants/patterns';
import {SPINNER_DIAMETER, TOURS_FOLDER} from '../../shared/constants/settings';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {CheckFormDataPipe} from '../../shared/pipes/check-form-data.pipe';
import {AuthService} from '../../shared/services/auth.service';
import {ActivitiesService} from '../../shared/services/activities.service';

@Component({
    selector: 'app-save-activity',
    templateUrl: './save-activity.component.html',
    styleUrls: ['./save-activity.component.scss']
})
export class SaveActivityComponent implements OnInit, OnDestroy {

    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;

    partners: Partner[] = [];
    activityTypes = [];
    saveActivityForm: FormGroup;
    uploadImages;
    activityFields = {
        'name': ['', Validators.required],
        'lat': ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
        'lng': ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
        'address': ['', Validators.required],
        'activity_type_id': ['', Validators.required],
        'partner_id': ['', Validators.required]
    };
    editCase = false;
    spinnerDiameter = SPINNER_DIAMETER;
    redirectUrl = this.auth.checkRoles('admin') ? 'admin/activities' : 'partners/activities';

    dropZoneFile;
    activityData;
    imgPath;

    options = {types: ['geocode']};

    routeDataSubscription: Subscription;
    partnersSubscription: Subscription;

    constructor(
        private _activities: ActivitiesService,
        private _fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        // private mapsAPILoader: MapsAPILoader,
        private toastr: ToastrService,
        public common: CommonService,
        private checkFormData: CheckFormDataPipe,
        public auth: AuthService
    ) {

        this.getPartners();
        this.getActivityType();

    }

    ngOnInit() {

        this.common.dataLoading = true;
        this.routeDataSubscription = this.route.data.subscribe(dt => {
            if (this.route.snapshot.paramMap.get('id')) {
                this.activityData = dt['activity'];
                this.activityFields['id'] = '';
                this.saveActivityForm = this._fb.group(this.activityFields);
                this.saveActivityForm.patchValue(this.activityData);
                this.saveActivityForm.controls['address'].disable();
                this.editCase = true;
                if (this.activityData['img']) {
                    this.imgPath = TOURS_FOLDER + this.activityData['img'];
                }
            }
            this.common.dataLoading = false;
        });

        if (!this.editCase) {
            this.saveActivityForm = this._fb.group(this.activityFields);
        }

        // this.mapsAPILoader.load().then(() => {
        //     if (this.searchElementRef) {
        //         const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
        //     }
        // });


    }

    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress() {
        this.saveActivityForm.patchValue({'address': ''});
        this.saveActivityForm.controls['address'].enable();
        // this.mapsAPILoader.load().then(() => {
        //     const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
        // });
    }


    /**
     * Gets partners list
     */
    getPartners() {
        this.partnersSubscription = this._activities.getPartners().subscribe((r: any) => {
            this.partners = r;
            this.checkFormData.transform('tour', this.activityData, this.partners, this.editCase);
        });
    }

    /**
     * Gets tour types list
     */
    getActivityType() {
        this._activities.getTypes().subscribe((types: any) => {
            this.activityTypes = types;
            if (types.length === 0) {
                this.toastr.info('Please add at least one activity type.', 'No activity types', {timeOut: 0});
            }
        });
    }

    /**
     * Gets uploaded file list
     * @param files files object
     */
    getFiles(files) {
        this.uploadImages = files.item(0);
    }

    /**
     * Add or edit a tour
     * @param searchAddress search full address
     */
    saveActivity(searchAddress) {

        // if (this.saveActivityForm.valid) {

        // if (!this.dropZoneFile && !this.editCase) {
        //     this.toastr.error('Please select an image to upload', 'No files');
        // } else {
        this.common.formProcessing = true;
        const data = this.saveActivityForm.value;
        const fd = new FormData();
        fd.append('lat', data.lat);
        fd.append('lng', data.lng);
        fd.append('name', data.name);
        fd.append('activity_type_id', data.activity_type_id ? data.activity_type_id : '');
        fd.append('partner_id', data.partner_id ? data.partner_id : '');
        fd.append('address', searchAddress.el.nativeElement.value.replace(/\r?\n|\r/g, ''));
        fd.append('upload_image', this.dropZoneFile ? this.dropZoneFile : '');
        if (!this.imgPath) {

            fd.append('img', this.dropZoneFile ? this.dropZoneFile.name : '');
        }
        fd.append('img_path', this.imgPath ? this.imgPath : '');

        if (this.editCase) {
            fd.append('id', data['id'])
            this._activities.update(fd).subscribe(dt => {
                this.common.formProcessing = false;
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The activity info has been updated successfully', 'Updated!');
            });
        } else {
            this._activities.add(fd).subscribe((r: any) => {
                this.common.formProcessing = false;
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The activity info has been added successfully', 'Added!');
            });
        }
        // }


        // }


    }


    getFile(e) {
        this.dropZoneFile = e;
    }

    removeSavedImg() {
        this.imgPath = '';
    }


    get tourForm() {
        return this.saveActivityForm;
    }

    get nameCtrl() {
        return this.tourForm.get('name');
    }

    get latCtrl() {
        return this.tourForm.get('lat');
    }

    get lngCtrl() {
        return this.tourForm.get('lng');
    }

    get addressCtrl() {
        return this.tourForm.get('address');
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
