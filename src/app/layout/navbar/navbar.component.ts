import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MAIN_SECTIONS} from '../../shared/constants/settings';
import {CommonService} from '../../shared/services/common.service';
import {MainService} from '../../home/services/main.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Data, NavigationEnd, Router} from '@angular/router';
import {PartnerService} from '../../shared/services/partner.service';
import {SubjectService} from '../../shared/services/subject.service';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {PartnerType} from '../../shared/models/PartnerType';

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
    partnerTypes: PartnerType[];
    sidebarOpen = false;
    subscriptions: Subscription[] = [];
    routerUrl;
    selectedSection: string;

    @Output() toggleSide = new EventEmitter();

    constructor(
        public common: CommonService,
        private _partner: PartnerService,
        private _fb: FormBuilder,
        public router: Router,
        private main: MainService,
        private subject: SubjectService,
        public auth: AuthService,
        private route: ActivatedRoute
    ) {
        this.mapForm = this._fb.group({
            type: ['']
        });
    }

    ngOnInit() {

        this.subscriptions.push(
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe((dt: Data) => {
                this.routerUrl = dt.url;
                this.subscriptions.push(this._partner.getTypes().subscribe((d: PartnerType[]) => {
                    this.mapForm.patchValue({type: d[0]['name']});
                    this.partnerTypes = d;
                }));
            })
        );


    }


    toggleSidebar() {
        this.toggleSide.emit();
        // if (this.router.url === '/' || this.router.url.includes('auth')) {
        //     this.sidebarOpen = !this.sidebarOpen;
        // }
    }

    closeSidebar() {
        this.sidebarOpen = false;
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
            console.log(this.selectedSection)

        });
    }


    changeSection(section) {
        this.mapForm.patchValue({type: section});
        this.changePlace(section);
        if (this.responsiveMode) {
            this.closeSidebar();
        }

    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['auth/login']);
    }

    navigateToDashboard() {
        const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
        this.router.navigate([`${role}/dashboard`]);
    }

    get showBurger() {
        return this.auth.loggedIn() && (this.router.url !== '/' && !this.router.url.includes('auth'));
    }

    get responsiveMode() {

        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
