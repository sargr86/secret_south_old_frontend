import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MAIN_SECTIONS} from '@core/constants/settings';
import {CommonService} from '@core/services/common.service';
import {MainService} from '../../../../home/services/main.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Data, NavigationEnd, Router} from '@angular/router';
import {PartnerService} from '@core/services/partner.service';
import {SubjectService} from '@core/services/subject.service';
import {AuthService} from '@core/services/auth.service';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {PartnerType} from '@shared/models/PartnerType';
import IsResponsive from '@core/helpers/is-responsive';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    mainSections = MAIN_SECTIONS;
    mapForm: FormGroup;
    latlng: any = [];
    lat = 0;
    lng = 0;
    subscriptions: Subscription[] = [];
    routerUrl = '';
    selectedSection = 'Accommodations';
    responsiveMode: boolean;

    @Output() toggleSide = new EventEmitter();

    constructor(
        public common: CommonService,
        private _partner: PartnerService,
        private _fb: FormBuilder,
        public router: Router,
        private main: MainService,
        private subject: SubjectService,
        public auth: AuthService,
        private route: ActivatedRoute,
    ) {

        // Checking for responsive mode and initializing map form
        this.responsiveMode = IsResponsive.check();
        this.mapForm = this._fb.group({
            type: ['']
        });
    }

    ngOnInit() {


        this.subscriptions.push(
            this.router.events
                .pipe(
                    filter(event => event instanceof NavigationEnd)
                )
                .subscribe((dt: Data) => {
                    this.routerUrl = dt.url;

                    // Getting partner types (section names) and setting 'Ferries' section as selected one
                    this.subscriptions.push(this._partner.getTypes().subscribe((d: PartnerType[]) => {
                        this.mapForm.patchValue({type: d.filter(t => t['name'] === 'Ferries')});
                    }));
                })
        );


    }

    /**
     * Emits toggle event to toggle sidebar
     */
    toggleSidebar() {
        this.toggleSide.emit();
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
                latlng: this.latlng
            });
            this.selectedSection = section;
        });
    }


    changeSection(section) {
        this.mapForm.patchValue({type: section});
        this.router.navigate([section.toLowerCase().replace('/', '-')]);
        this.changePlace(section);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    navigateToDashboard() {
        const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
        this.router.navigate([`${role}/dashboard/show`]);
    }

    checkIfAuthDashboardPage() {
        return /auth|admin|partner|employee|customers/.test(this.router.url);
    }

    getStartDate() {

    }

    dateChanged() {

    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
