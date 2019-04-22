import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {MainService} from '../services/main.service';
import * as Base from '../../config.js';
import * as mapStylesData from '../../maps/map_styles2.json';
import {Router} from '@angular/router';
import {PartnerService} from '../../admin/services/partner.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    @ViewChild('addSearch')
    public searchelementRef: ElementRef;
    public lat = 0;
    public lng = 0;
    latlng: any = [];
    searchBy = {'type': ''};
    imgPath: String = '';
    public successData = false;

    mapStyles;
    partnerTypes;

    mapForm: FormGroup;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private main: MainService,
        public router: Router,
        private _partner: PartnerService,
        private _fb: FormBuilder
    ) {
        this.mapForm = this._fb.group({
            type: ['']
        });
        // this.mapForm.patchValue({searchTerm: 1});
        this.mapStyles = mapStylesData['default'];
    }

    ngOnInit() {
        this.imgPath = Base.imgPath;
        this.getFerryLocation();
        this._partner.getTypes().subscribe((dt: any) => {
            const ferries = dt.filter(d => d['name'] === 'Ferries');
            this.mapForm.patchValue({type: dt[0]['name']});
            this.partnerTypes = dt;
        });
    }

    getFerryLocation() {

        this.latlng = this.main.getFerryLocation().subscribe((r: any) => {

            if (r.status == 0) {
                alert(r['message']);
                return false;
            }

            let arr = [];
            if (r) {
                r.map((latlngs) => {
                    latlngs.lat = parseFloat(latlngs.lat);
                    latlngs.lng = parseFloat(latlngs.lng);
                    arr.push(latlngs);
                });

                this.latlng = arr;
                if (this.latlng.length > 0) {
                    this.lat = parseFloat(this.latlng[0].lat);
                    this.lng = parseFloat(this.latlng[0].lng);
                    this.successData = true;
                }

            }
        });
    }


    changePlace() {
        console.log(this.mapForm.value)
        this.main.changePlace(this.mapForm.value).subscribe((r: any) => {

            this.latlng = [];

            if (r && r.length > 0) {

                r.map((latlngs) => {
                    latlngs.lat = parseFloat(latlngs.lat);
                    latlngs.lng = parseFloat(latlngs.lng);
                    this.latlng.push(latlngs);
                });

                this.lat = parseFloat(this.latlng[0].lat);
                this.lng = parseFloat(this.latlng[0].lng);
                this.successData = true;
            }

        });
    }

    getLocation() {
        console.log(navigator.geolocation)
        if (navigator.geolocation) {
            // timeout at 60000 milliseconds (60 seconds)
            var options = {timeout: 10000};
            let geoLoc = navigator.geolocation;
            let watchID = geoLoc.watchPosition(this.showLsocation, this.errorHandler, options);
        } else {
            alert("Sorry, browser does not support geolocation!");
        }
    }

    errorHandler(err) {
        if (err.code == 1) {
            alert("Access denied");
        } else if (err.code == 2) {
            alert("Position is unvailable!");
        }
    }

    showLsocation(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
    }
}
