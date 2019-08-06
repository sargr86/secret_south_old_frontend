import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MAIN_SECTIONS} from '../../shared/constants/settings';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {COUNTRY_RESTRICTED_PLACES} from '../../shared/helpers/google-one-country-places-getter';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MainService} from '../../home/services/main.service';
import {SubjectService} from '../../shared/services/subject.service';
import IsResponsive from '../../shared/helpers/is-responsive';

@Component({
    selector: 'app-ferries-header',
    templateUrl: './ferries-header.component.html',
    styleUrls: ['./ferries-header.component.scss']
})
export class FerriesHeaderComponent implements OnInit {

    mainSections = MAIN_SECTIONS;
    mapForm: FormGroup;
    latlng: any = [];
    lat = 0;
    lng = 0;
    subscriptions: Subscription[] = [];
    routerUrl: string;
    selectedSection = 'Ferries';
    responsiveMode: boolean;
    countryRestrictredPlaces = COUNTRY_RESTRICTED_PLACES;
    personsCount = 2;

    @Output() toggle = new EventEmitter();

    constructor(
        public router: Router,
        public auth: AuthService,
        private _fb: FormBuilder,
        private main: MainService,
        private subject: SubjectService
    ) {

    }

    ngOnInit() {

        // Checking for responsive mode and initializing map form
        this.responsiveMode = IsResponsive.check();
        this.mapForm = this._fb.group({
            type: ['']
        });
    }

    toggleSidebar() {
        this.toggle.emit();
    }

    changePlace(section) {
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


            }

            this.subject.setMapData({
                section: section,
                lat: this.lat,
                lng: this.lng,
                list: r
            });
            this.selectedSection = section;
        });
    }

    changeSection(section) {
        if (section === 'Accommodations') {
            this.mapForm.patchValue({type: section});
            this.router.navigate([section.toLowerCase()]);
            this.changePlace(section);
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    navigateToDashboard() {
        const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
        this.router.navigate([`${role}/dashboard/show`]);
    }

    getStartDate() {

    }

    dateChanged() {

    }

    searchFerries() {
        // this.router.navigate(['ferries/list']);
    }

    personsCountChanged(e) {

    }

}
