import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ToursService} from "../services/tours.service";
import {MapsAPILoader} from '@agm/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export interface Animal {
    name: string;
}

@Component({
    selector: 'app-add-tours',
    templateUrl: './add-tours.component.html',
    styleUrls: ['./add-tours.component.scss']
})
export class AddToursComponent implements OnInit {

    @ViewChild('addSearch')
    public searchelementRef: ElementRef;

    constructor(
        private http: HttpClient, private router: Router,
        private  tours: ToursService, private mapsAPILoader: MapsAPILoader,
        private route: ActivatedRoute
    ) {
    }

    toursTypeName: any = [];
    editCase = false;

    ngOnInit() {
        // if (!this.checkAdmin()) {
        //     this.router.navigate(['admin-panel']);
        // }
        this.getToursType();
        this.getPartners();
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchelementRef.nativeElement, {types: ['geocode']});
        });

        const name = this.route.snapshot.paramMap.get('name');
        if (name) {

            this.tours.getOneTour({name: name}).subscribe((dt: any) => {
                this.addTours = dt[0];
                this.editCase = true;
            });
        }

    }

    nameFormControl = new FormControl('', [
        Validators.required
    ]);

    latFormControl = new FormControl('', [
        Validators.required
    ]);

    lngFormControl = new FormControl('', [
        Validators.required
    ]);

    toursTypeControl = new FormControl('', [
        Validators.required
    ]);

    typeFormControl = new FormControl('', [
        Validators.required
    ]);

    partnersTypeControl = new FormControl('', [
        Validators.required
    ]);


    matcher = new MyErrorStateMatcher();

    addTours = {name: '', address: '', img: '', tours_type_id: '', lat: '', lng: '', partner_id: ''};
    partnersTypeName: any = [];
    upload_images = null;

    getPartners() {
        this.tours.getAllpartner().subscribe((r: any) => {

            if (r.status == 0) {
                alert(r['message']);
                return false;
            }

            r['result'].map(k => this.partnersTypeName.push(k));
        });
    }

    getToursType() {
        this.tours.getAllTourType().subscribe((r: any) => {

            if (r.status == 0) {
                alert(r['message']);
                return false;
            }

            r['result'].map(k => this.toursTypeName.push(k));
        });
    }

    saveTours(data) {

        const fd = new FormData();
        fd.append('lat', data.lat);
        fd.append('lng', data.lng);
        fd.append('name', data.name);
        fd.append('tours_type_id', data.tours_type_id);
        fd.append('partner_id', data.partner_id);
        fd.append('address', data.address);
        fd.append('upload_image', this.upload_images);

        if (this.editCase) {
            fd.append('id', this.addTours['id'])
            this.tours.updateTour(fd).subscribe(dt => {
                this.router.navigate(['/admin/AllTours']);
            });
        }

        else {
            this.tours.insertTours(fd).subscribe((r: any) => {

                if (r.status == 0) {
                    alert(r['message']);
                    return false;
                }

                this.router.navigate(['/admin/AllTours']);
            });
        }


    }

    handleFileInput(files: FileList) {
        this.upload_images = files.item(0);
    }


    checkAdmin() {
        let jsAdminInf = localStorage.getItem('adminInf');
        if (typeof jsAdminInf == 'undefined') {
            return false;
        }

        let adminInf = JSON.parse(jsAdminInf);

        if (adminInf == null) {
            return false;
        }

        if (adminInf['admin_session_inf'] == '') {
            return false;
        }

        return true;
    }

}
