import {Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import * as mapStylesData from '../../maps/map_styles2.json';
import {BookingFormComponent} from '@shared/components/booking-form/booking-form.component';
import {API_URL, MAIN_SECTIONS, UPLOADS_FOLDER} from '@core/constants/global';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AgmInfoWindow, MapsAPILoader} from '@agm/core';
import {MainService} from '@core/services/main.service';
import {Router} from '@angular/router';
import {PartnerService} from '@core/services/partner.service';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '@core/services/common.service';
import {SubjectService} from '@core/services/subject.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    @ViewChild('addSearch')
    public searchelementRef: ElementRef;
    public lat = 0;
    public lng = 0;
    latlng: any = [];
    searchBy = {'type': ''};
    imgPath: String = API_URL;
    public successData = false;


    // public lat: Number = 24.799448;
    // public lng: Number = 120.979021

    public origin: any;
    public destination: any;

    mapStyles;
    partnerTypes;

    mapForm: FormGroup;
    mainSections = MAIN_SECTIONS;
    currentSection = 'Ferries';

    progressVal = 0;
    overlayOpacity = 1;

    subscriptions: Subscription[] = [];
    currentIW: AgmInfoWindow;
    previousIW: AgmInfoWindow;

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
        public common: CommonService,
        private subject: SubjectService,
        private dialog: MatDialog,
    ) {

        this.subject.getMapData().subscribe(dt => {
            this.lng = dt.lng;
            this.lat = dt.lat;
            this.latlng = dt.latlng;
            console.log(dt)
            // this.currentSection = dt.section === 'map'? ;
        });
    }


    ngOnInit() {

        this.getDirection();
        this.getGeo();

        this.currentIW = null;
        this.previousIW = null;

        // Simulating loading progress bar here
        const int = setInterval(() => {
            const random = Math.random() * 10 + 10;
            this.progressVal += random;
            if (this.progressVal > 100) {
                clearInterval(int);
                this.common.showOverlay = false;
            }
        }, 500);

        // this.imgPath = Base.imgPath;
        this.getFerryLocation();

        // this.getLocation();
        this.mapStyles = mapStylesData['default'];
    }


    getGeo() {
        // setInterval(() => {
        //     console.log('here')
        //     this.main.getRealLocations().subscribe(dt => {
        //
        //     });
        // }, 2000);
    }

    getDirection() {
        this.origin = {lat: 51.797999, lng: -8.294371};
        this.destination = {lat: 52.257385, lng: -6.338164};

        const mexicoCity = new google.maps.LatLng(51.797999, -8.294371);
        const jacksonville = new google.maps.LatLng(52.797999, -8.394371);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
        // console.log(Math.round(distance / 1000))
        // this.origin = 'Taipei Main Station'
        // this.destination = 'Taiwan Presidential Office'
    }


    getFerryLocation() {

        this.latlng = this.main.getFerryLocation().subscribe((r: any) => {
            if (r.status === 0) {
                this.toastr.error(r.message);
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


    getIcon() {
        let icon = '';
        const iconsFolder = 'assets/icons/';
        if (this.currentSection === 'Ferries') {
            icon = 'baseline-directions_boat-24px.svg';
        } else if (this.currentSection === 'Food/Drink') {
            icon = 'food-drink.png';
        } else if (this.currentSection === 'Accommodations') {
            icon = 'acc4.png';
        } else if (this.currentSection === 'Activities') {
            icon = 'baseline-directions_run-24px.svg';
        }


        return iconsFolder + icon;
    }


    markerClick(infoWindow) {
        if (this.previousIW) {
            this.currentIW = infoWindow;
            // console.log(this.previousIW, infoWindow)
            this.previousIW.close();
        }
        this.previousIW = infoWindow;
    }

    mapClick() {

        if (this.previousIW) {
            this.previousIW.close().then(dt => {

            });
        }
    }

    /**
     * Books a selected item
     * @param item selected item on the map
     * @param category selected category name
     */
    book(item, category) {
        const dialogRef = this.dialog.open(BookingFormComponent, {
            autoFocus: true, width: '800px', height: '550px',
            data: {section: 'food/drink', item: item, folder: `${UPLOADS_FOLDER}others/${category.toLowerCase()}`}
        });

        // Post-confirming actions
        this.subscriptions.push(dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                }
            }
        ));
    }


}
