import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToursService} from '../../shared/services/tours.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {SPINNER_DIAMETER, TOURS_FOLDER} from '../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {patternValidator} from '../../shared/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '../../shared/constants/patterns';
import {Partner} from '../../shared/models/Partner';
import {CheckFormDataPipe} from '../../shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-save-tour',
    templateUrl: './save-tour.component.html',
    styleUrls: ['./save-tour.component.scss']
})
export class SaveTourComponent implements OnInit, OnDestroy {


    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;

    partners: Partner[] = [];
    tourTypes = [];
    saveTourForm: FormGroup;
    uploadImages;
    tourFields = {
        'name': ['', Validators.required],
        'lat': ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
        'lng': ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
        'address': ['', Validators.required],
        'tours_type_id': ['', Validators.required],
        'partner_id': ['', Validators.required]
    };
    editCase = false;
    spinnerDiameter = SPINNER_DIAMETER;
    redirectUrl = 'admin/tours/show';

    dropZoneFile;
    tourData;
    imgPath;

    options = {types: ['geocode']};

    routeDataSubscription: Subscription;
    partnersSubscription: Subscription;

    constructor(
        private _tours: ToursService,
        private _fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private toastr: ToastrService,
        public common: CommonService,
        private checkFormData: CheckFormDataPipe
    ) {

        this.getPartners();
        this.getToursType();

    }

    ngOnInit() {

        this.common.dataLoading = true;
        this.routeDataSubscription = this.route.data.subscribe(dt => {
            if (this.route.snapshot.paramMap.get('id')) {
                this.tourData = dt['oneTour'];
                this.tourFields['id'] = '';
                this.saveTourForm = this._fb.group(this.tourFields);
                this.saveTourForm.patchValue(this.tourData);
                this.saveTourForm.controls['address'].disable();
                this.editCase = true;
                if (this.tourData['img']) {
                    this.imgPath = TOURS_FOLDER + this.tourData['img'];
                }
            }
            this.common.dataLoading = false;
        });

        if (!this.editCase) {
            this.saveTourForm = this._fb.group(this.tourFields);
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
        this.saveTourForm.patchValue({'address': ''});
        this.saveTourForm.controls['address'].enable();
        // this.mapsAPILoader.load().then(() => {
        //     const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
        // });
    }


    /**
     * Gets partners list
     */
    getPartners() {
        this.partnersSubscription = this._tours.getPartners().subscribe((r: any) => {
            this.partners = r;
            this.checkFormData.transform('tour', this.tourData, this.partners, this.editCase);
        });
    }

    /**
     * Gets tour types list
     */
    getToursType() {
        this._tours.getAllTourType().subscribe((types: any) => {
            this.tourTypes = types;
            if (types.length === 0) {
                this.toastr.info('Please add at least one tour type.', 'No tour types', {timeOut: 0});
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
    saveTour(searchAddress) {

        // if (this.saveTourForm.valid) {

        // if (!this.dropZoneFile && !this.editCase) {
        //     this.toastr.error('Please select an image to upload', 'No files');
        // } else {
            this.common.formProcessing = true;
            const data = this.saveTourForm.value;
            const fd = new FormData();
            fd.append('lat', data.lat);
            fd.append('lng', data.lng);
            fd.append('name', data.name);
            fd.append('tours_type_id', data.tours_type_id ? data.tours_type_id : '');
            fd.append('partner_id', data.partner_id ? data.partner_id : '');
            fd.append('address', searchAddress.el.nativeElement.value.replace(/\r?\n|\r/g, ''));
            fd.append('upload_image', this.dropZoneFile ? this.dropZoneFile : '');
            if (!this.imgPath) {

                fd.append('img', this.dropZoneFile ? this.dropZoneFile.name : '');
            }
            fd.append('img_path', this.imgPath ? this.imgPath : '');

            if (this.editCase) {
                fd.append('id', data['id'])
                this._tours.updateTour(fd).subscribe(dt => {
                    this.common.formProcessing = false;
                    this.router.navigate([this.redirectUrl]);
                    this.toastr.success('The tour info has been updated successfully', 'Updated!');
                });
            } else {
                this._tours.insertTours(fd).subscribe((r: any) => {
                    this.common.formProcessing = false;
                    this.router.navigate([this.redirectUrl]);
                    this.toastr.success('The tour info has been added successfully', 'Added!');
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
        return this.saveTourForm;
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
