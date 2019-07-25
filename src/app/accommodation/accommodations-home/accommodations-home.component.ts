import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../shared/services/subject.service';

@Component({
    selector: 'app-accommodations-home',
    templateUrl: './accommodations-home.component.html',
    styleUrls: ['./accommodations-home.component.scss']
})
export class AccommodationsHomeComponent implements OnInit {
    accommodationObjects;
    galleryOptions = [
        {preview : false},
        {'image': false, 'height': '100px'},
        {'breakpoint': 500, 'width': '100%'}
    ];

    constructor(
        private subject: SubjectService
    ) {
    }

    ngOnInit() {
        this.subject.getMapData().subscribe(dt => {
            this.accommodationObjects = dt;
            console.log(dt)
            // this.latlng = dt.latlng;
        });
    }

}
