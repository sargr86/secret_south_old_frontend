import {Component, OnInit} from '@angular/core';
import {AuthService} from '@core/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './show-profile.component.html',
    styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

    constructor(
        public auth: AuthService
    ) {
    }

    ngOnInit() {
    }

}
