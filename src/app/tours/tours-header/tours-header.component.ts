import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {COUNTRY_RESTRICTED_PLACES} from '../../shared/helpers/google-one-country-places-getter';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import IsResponsive from '../../shared/helpers/is-responsive';
import {ToursService} from '../../shared/services/tours.service';

@Component({
    selector: 'app-tours-header',
    templateUrl: './tours-header.component.html',
    styleUrls: ['./tours-header.component.scss']
})
export class ToursHeaderComponent implements OnInit {
    countryRestrictredPlaces = COUNTRY_RESTRICTED_PLACES;
    personsCount = 2;
    selectedSection = 'Tours';
    responsiveMode: boolean;
    tourTypes;

    @Output() toggle = new EventEmitter();

    constructor(
        public router: Router,
        public auth: AuthService,
        private  _tours: ToursService
    ) {
        // Checking for responsive mode and initializing map form
        this.responsiveMode = IsResponsive.check();
    }

    ngOnInit() {
        this._tours.getAllTourType().subscribe(d => {
            this.tourTypes = d;
        });
    }

    getStartDate() {

    }

    dateChanged() {

    }

    personsCountChanged(e) {

    }

    toggleSidebar() {
        this.toggle.emit();
    }

    /**
     * Navigates to the user dashboard
     */
    navigateToDashboard() {
        const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
        this.router.navigate([`${role}/dashboard/show`]);
    }


    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

}
