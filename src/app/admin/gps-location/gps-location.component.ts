import {Component, OnInit} from '@angular/core';
import {MapLoaderService} from '../../maps/map.loader';
import {FerryService} from '../ferry.service';
import {Router} from '@angular/router';
import {GpsLocationService} from '../services/gps-location.service';

declare var google: any;

@Component({
    selector: 'app-gps-location',
    templateUrl: './gps-location.component.html',
    styleUrls: ['./gps-location.component.scss']
})

export class GpsLocationComponent implements OnInit {
    map: any;
    drawingManager: any;
    ferryName: any = [];
    ferryName2: any = [];
    partner = {partner_id: ''};
    drawing = {'drawingLatLng': [], 'markerLatLng': []};

    constructor(private ferry: FerryService, private router: Router, private gpsServises: GpsLocationService) {
    }

    ngOnInit() {
        this.getferry();
    }

    getferry() {
        this.ferry.getFerry().subscribe((r: any) => {

            if (r.status == 0) {
                alert(r['message']);
                alert(r['message']);
                return false;
            }
            // console.log(r);
            r['result'].map(k => this.ferryName.push(k));
            r['result'].map(k => this.ferryName2.push(k));
        });
    }

    filterferryBus(el) {
        let val = el.value;
        this.ferryName = this.ferryName2;
        this.ferryName = this.ferryName.filter(single => single['type'] == val);
    }

    setPartner() {
        MapLoaderService.load().then(() => {

            this.drawPolygon();
        });
    }

    saveRoad() {
        this.drawing['ferry_id'] = this.partner['partner_id'];
        console.log(this.drawing);
        this.gpsServises.saveLocate(this.drawing).subscribe((r: any) => {

            if (r.status == 0) {
                alert(r['message']);
                return false;
            }

            this.router.navigate(['admin/dashboard']);
        });
    }

    drawPolygon() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 52.8757843, lng: -7.3217572},
            zoom: 8
        });



        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYLINE,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
            //     drawingModes: ['polyline', 'marker'],
                drawingModes: [google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.MARKER],
            },
            polylineOptions: {
                strokeColor: '#FF0000',
            }
        });
        console.log(this.drawingManager)
        this.drawingManager.setMap(this.map);
        google.maps.event.addListener(this.drawingManager, 'polylinecomplete', (event) => {
            // if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
                let arr = event.getPath().getArray();

                arr.map((data) => {
                    this.drawing['drawingLatLng'].push({'lat': data.lat(), 'lng': data.lng()});
                });
            // }
        });

        google.maps.event.addListener(this.drawingManager, 'markercomplete', (event) => {
            // if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
                this.drawing['markerLatLng'].push({'lat': event.getPosition().lat(), 'lng': event.getPosition().lng()});
            // }
        });
    }
}
