import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {COUNTRY_RESTRICTED_PLACES} from '../../shared/helpers/google-one-country-places-getter';
import IsResponsive from '../../shared/helpers/is-responsive';
import {ActivitiesService} from '../../shared/services/activities.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-activities-header',
    templateUrl: './activities-header.component.html',
    styleUrls: ['./activities-header.component.scss'],
})
export class ActivitiesHeaderComponent implements OnInit {
    countryRestrictredPlaces = COUNTRY_RESTRICTED_PLACES;
    personsCount = 2;
    selectedSection = 'Activities';
    responsiveMode: boolean;
    activityTypes;

    @Output() toggle = new EventEmitter();

    constructor(
        private _activities: ActivitiesService,
        public router: Router,
        public auth: AuthService
    ) {
        // Checking for responsive mode and initializing map form
        this.responsiveMode = IsResponsive.check();
    }

    ngOnInit() {
        this._activities.getTypes().subscribe(dt => {
            this.activityTypes = dt;
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

    searchActivities() {
        this.router.navigate(['activities/list']);
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
