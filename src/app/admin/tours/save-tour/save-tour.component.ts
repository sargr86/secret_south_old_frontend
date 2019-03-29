import {Component, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-save-tour',
    templateUrl: './save-tour.component.html',
    styleUrls: ['./save-tour.component.scss']
})
export class SaveTourComponent implements OnInit {

    partners;
    tourType;
    saveTourForm: FormGroup;
    editCase = false;
    uploadImages;
    tourFields = {
        'name': '',
        'lat': '',
        'lng': '',
        'address': '',
        'tours_type_id': '',
        'partner_id': '',
    };

    constructor(
        private _tours: ToursService,
        private _fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute
    ) {
        this.getPartners();
        this.getToursType();
    }

    ngOnInit() {
        this.saveTourForm = this._fb.group(this.tourFields);

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this._tours.getOneTour({id: id}).subscribe((dt: any) => {
                this.tourFields['id'] = '';
                this.saveTourForm = this._fb.group(this.tourFields);
                this.saveTourForm.patchValue(dt[0]);
                this.editCase = true;
            });
        }
    }


    getPartners() {
        this._tours.getAllpartner().subscribe((r: any) => {
            this.partners = r['result'];
        });
    }

    getToursType() {
        this._tours.getAllTourType().subscribe((r: any) => {
            this.tourType = r['result'];
        });
    }

    getFiles(files) {
        this.uploadImages = files.item(0);
    }

    saveTour() {
        const data = this.saveTourForm.value;
        const fd = new FormData();
        fd.append('lat', data.lat);
        fd.append('lng', data.lng);
        fd.append('name', data.name);
        fd.append('tours_type_id', data.tours_type_id);
        fd.append('partner_id', data.partner_id);
        fd.append('address', data.address);
        fd.append('upload_image', this.uploadImages);

        if (this.editCase) {
            fd.append('id', data['id'])
            this._tours.updateTour(fd).subscribe(dt => {
                this.router.navigate(['/admin/AllTours']);
            });
        } else {
            this._tours.insertTours(fd).subscribe((r: any) => {
                this.router.navigate(['/admin/AllTours']);
            });
        }


    }
}
