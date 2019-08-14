import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {ToastrService} from 'ngx-toastr';
import * as mapStylesData from '../../maps/map_styles2.json';

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
    imgPath;

    constructor(
        private main: MainService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.getFerryLocation();
        this.mapStyles = mapStylesData['default'];
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

    markerClick(w) {

    }

    getIcon() {
        return '../../../assets/icons/ferry.svg';
    }


}
