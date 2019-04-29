import {Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {MainService} from '../services/main.service';
import * as Base from '../../config.js';
import * as mapStylesData from '../../maps/map_styles2.json';
import {Router} from '@angular/router';
import {PartnerService} from '../../admin/services/partner.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAIN_SECTIONS} from '../../shared/constants/settings';

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
    mainSections = MAIN_SECTIONS;


    // Material toolbar background color toggling on scroll
    @HostListener('window:scroll', ['$event'])
    toggleToolbarBg() {
        // const toolbar = document.querySelector('.mat-toolbar');
        // if (window.pageYOffset >= 179) {
        //
        //     toolbar.classList.add('header-bg');
        // } else {
        //     toolbar.classList.remove('header-bg');
        // }
    }

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
        this.mapStyles = mapStylesData['default'];
    }

    ngOnInit() {
        this.imgPath = Base.imgPath;
        this.getFerryLocation();
        this._partner.getTypes().subscribe((dt: any) => {
            this.mapForm.patchValue({type: dt[0]['name']});
            this.partnerTypes = dt;
        });
        this.getLocation();
    }


    getFerryLocation() {

        this.latlng = this.main.getFerryLocation().subscribe((r: any) => {

            if (r.status === 0) {
                alert(r['message']);
                return false;
            }

            const arr = [];
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
        if (navigator.geolocation) {
            // timeout at 60000 milliseconds (60 seconds)
            const options = {timeout: 10000};
            const geoLoc = navigator.geolocation;
            const watchID = geoLoc.watchPosition(this.showLocation, this.errorHandler, options);
        } else {
            alert('Sorry, browser does not support geolocation!');
        }
    }

    errorHandler(err) {
        if (err.code === 1) {
            alert('Access denied');
        } else if (err.code === 2) {
            alert('Position is unvailable!');
        }
    }

    showLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    }

    scrollToTop() {
        window.scrollTo({top: 0});
    }

}
