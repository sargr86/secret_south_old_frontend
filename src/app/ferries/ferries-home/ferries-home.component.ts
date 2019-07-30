import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-ferries-home',
    templateUrl: './ferries-home.component.html',
    styleUrls: ['./ferries-home.component.scss']
})
export class FerriesHomeComponent implements OnInit {

    lat = 51.797999;
    lng = -8.294371;
    ferryPositions;

    constructor(
        private main: MainService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.getFerryLocation();
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
                console.log(this.ferryPositions)
            }
        });
    }


}
