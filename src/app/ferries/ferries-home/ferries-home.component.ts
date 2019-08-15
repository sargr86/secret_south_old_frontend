import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {ToastrService} from 'ngx-toastr';
import * as mapStylesData from '../../maps/map_styles2.json';
import {API_URL} from '../../shared/constants/settings';
import {FerryService} from '../../shared/services/ferry.service';
import {Ferry} from '../../shared/models/Ferry';
import {NgxGalleryOptions} from 'ngx-gallery';

@Component({
    selector: 'app-ferries-home',
    templateUrl: './ferries-home.component.html',
    styleUrls: ['./ferries-home.component.scss']
})
export class FerriesHomeComponent implements OnInit {

    lat = 51.797999;
    lng = -8.294371;
    latlng = [];
    ferryPositions: any = {lat: 0, lng: 0};
    mapStyles;
    host = API_URL;
    selectedFerry = null;
    selectAction;
    showFilters = true;
    ferryData: Ferry;
    previous;

    galleryOptions: NgxGalleryOptions[] = [
        {
            'previewFullscreen': true,
            'height': '200px',
            'previewKeyboardNavigation': true,
            'imageDescription': true,
            'previewCloseOnEsc': true
        },
        {'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3},
        {'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2},

    ];

    constructor(
        private main: MainService,
        private toastr: ToastrService,
        private _ferries: FerryService
    ) {
    }

    ngOnInit(): void {
        this.getFerryLocation();
        this.mapStyles = mapStylesData['default'];
        this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
    }

    getFerryLocation() {

        this.main.getFerryLocation().subscribe((r: any) => {
            if (r.status === 0) {
                this.toastr.error(r.message);
            }

            const arr = [];
            if (r) {
                r.map((latlngs) => {
                    this.ferryPositions.lat = parseFloat(latlngs.lat);
                    this.ferryPositions.lng = parseFloat(latlngs.lng);
                    arr.push(latlngs);
                });

                this.ferryPositions = arr;
            }
        });
    }

    mapClick(e) {

    }

    markerClick(infowindow) {
        if (this.previous) {
            this.previous.close();
        }
        this.previous = infowindow;
        this.selectedFerry = null;
        this.selectAction = 'Select';
    }

    closeInfoWindow() {
        this.selectedFerry = null;
        this.selectAction = 'Select';
    }

    // toggleInfoWindow(ferry) {
    //     this.selectedFerry = this.selectAction === 'Select' ? ferry : null;
    //     this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
    //     this._ferries.getOneFerry({id: ferry.id}).subscribe(d => {
    //         this.ferryData = d;
    //     });
    // }

    getIcon() {
        return '../../../assets/icons/ferry.svg';
    }

    selectFerry(ferry) {

        this.selectedFerry = this.selectAction === 'Select' ? ferry : null;
        this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
        this._ferries.getOneFerry({id: ferry.id}).subscribe(d => {
            this.ferryData = d;
        });
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

}
