import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToursService} from '../../services/tours.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-save-tour',
    templateUrl: './save-tour.component.html',
    styleUrls: ['./save-tour.component.scss']
})
export class SaveTourComponent implements OnInit {


    @ViewChild('searchAddress')
    public searchElementRef: ElementRef;

    partners;
    tourType;
    saveTourForm: FormGroup;
    uploadImages;
    tourFields = {
        'name': ['', Validators.required],
        'lat': ['', Validators.required],
        'lng': ['', Validators.required],
        'address': ['', Validators.required],
        'tours_type_id': ['', Validators.required],
        'partner_id': ['', Validators.required]
    };
    editCase = false;
    dataLoading = false;
    formProcessing = false;
    spinnerDiameter = SPINNER_DIAMETER;

    constructor(
        private _tours: ToursService,
        private _fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private toastr: ToastrService
    ) {
        this.getPartners();
        this.getToursType();


    }

    ngOnInit() {
        this.saveTourForm = this._fb.group(this.tourFields);

        this.mapsAPILoader.load().then(() => {
            if (this.searchElementRef) {
                const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
                const id = this.route.snapshot.paramMap.get('id');
                if (id) {
                    this.dataLoading = true;
                    this._tours.getOneTour({id: id}).subscribe((dt: any) => {
                        if (dt && dt.length > 0) {

                            this.tourFields['id'] = '';
                            this.saveTourForm = this._fb.group(this.tourFields);
                            this.saveTourForm.patchValue(dt[0]);
                            this.editCase = true;
                        }
                        this.dataLoading = false;
                    });
                }
            }
        });


    }

    /**
     * Resets address and reloads maps api to allow user to select from drop down again
     */
    resetAddress() {
        this.saveTourForm.patchValue({'address': ''});
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
        });
    }


    /**
     * Gets partners list
     */
    getPartners() {
        this._tours.getAllpartner().subscribe((r: any) => {
            this.partners = r['result'];
        });
    }

    /**
     * Gets tour types list
     */
    getToursType() {
        this._tours.getAllTourType().subscribe((r: any) => {
            this.tourType = r['result'];
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

        if (this.saveTourForm.valid) {

            if (!this.uploadImages) {
                this.toastr.error( 'Please select an image to upload','No files');
            } else {
                this.formProcessing = true;
                const data = this.saveTourForm.value;
                const fd = new FormData();
                fd.append('lat', data.lat);
                fd.append('lng', data.lng);
                fd.append('name', data.name);
                fd.append('tours_type_id', data.tours_type_id);
                fd.append('partner_id', data.partner_id);
                fd.append('address', searchAddress.value);
                fd.append('upload_image', this.uploadImages);

                if (this.editCase) {
                    fd.append('id', data['id'])
                    this._tours.updateTour(fd).subscribe(dt => {
                        this.formProcessing = false;
                        this.router.navigate(['/admin/AllTours']);
                        this.toastr.success('The tour info has been updated successfully', 'Updated!');
                    });
                } else {
                    this._tours.insertTours(fd).subscribe((r: any) => {
                        this.formProcessing = false;
                        this.router.navigate(['/admin/AllTours']);
                        this.toastr.success('The tour info has been added successfully', 'Added!');
                    });
                }
            }


        }


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

}
