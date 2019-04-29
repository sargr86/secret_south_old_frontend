import {Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {MainService} from '../services/main.service';
import * as Base from '../../config.js';
import * as mapStylesData from '../../maps/map_styles2.json';
import {Router} from '@angular/router';
import {PartnerService} from '../../admin/services/partner.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAIN_SECTIONS} from '../../shared/constants/settings';
import {ToastrService} from "ngx-toastr";
import {CommonService} from "../../shared/services/common.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: [
        trigger('Fading', [
            state('void', style({opacity: 0})),
            state('*', style({opacity: 1})),
            transition(':enter', animate('400ms ease-out')),
            transition(':leave', animate('400ms ease-in')),
        ])
    ]

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

    progressVal = 0;
    overlayOpacity = 1;

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
        private _fb: FormBuilder,
        private toastr: ToastrService,
        public common: CommonService
    ) {
        this.mapForm = this._fb.group({
            type: ['']
        });

    }

    ngOnInit() {


        // Simulating loading progress bar here
        let int = setInterval(() => {
            let random = Math.random() * 10 + 10;
            this.progressVal += random;
            if (this.progressVal > 100) {
                clearInterval(int);
                this.common.showOverlay = false;
            }
        }, 500);

        this.imgPath = Base.imgPath;
        this.getFerryLocation();
        this._partner.getTypes().subscribe((dt: any) => {
            this.mapForm.patchValue({type: dt[0]['name']});
            this.partnerTypes = dt;
        });
        // this.getLocation();
        this.mapStyles = mapStylesData['default'];
    }


    getFerryLocation() {

        this.latlng = this.main.getFerryLocation().subscribe((r: any) => {
            if (r.status === 0) {
                this.toastr.error(r.message)
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


    changeSection(section) {
        this.mapForm.patchValue({type: section})
        this.changePlace();
    }

    getLocation() {
        if (navigator.geolocation) {
            // timeout at 60000 milliseconds (60 seconds)
            const options = {timeout: 10000};
            const geoLoc = navigator.geolocation;
            const watchID = geoLoc.watchPosition(this.showLocation.bind(this), this.errorHandler.bind(this), options);
        } else {
            alert('Sorry, browser does not support geolocation!');
        }
    }

    errorHandler(err) {
        this.toastr.error('', err.message, {timeOut: 0});
    }

    showLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    }

    scrollToTop() {
        window.scrollTo({top: 0});
    }

}
