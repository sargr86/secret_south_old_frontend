import {Component, OnInit} from '@angular/core';
import {AccommodationsService} from '@shared/services/accommodations.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-accommodation-single',
    templateUrl: './accommodation-single.component.html',
    styleUrls: ['./accommodation-single.component.scss']
})
export class AccommodationSingleComponent implements OnInit {
    accommodation;

    constructor(
        private _accommodations: AccommodationsService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        const accommodation_id = this.route.snapshot.params.id;

        this._accommodations.getOne({id: accommodation_id}).subscribe(dt => {
            this.accommodation = dt;
        });
    }

}
