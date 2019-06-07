import {Component, OnInit} from '@angular/core';
import {MAIN_SECTIONS} from '../../shared/constants/settings';
import {CommonService} from '../../shared/services/common.service';
import {MainService} from '../../home/services/main.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {PartnerService} from '../../shared/services/partner.service';
import {SubjectService} from '../../shared/services/subject.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    mainSections = MAIN_SECTIONS;
    mapForm: FormGroup;
    latlng: any = [];
    lat = 0;
    lng = 0;
    partnerTypes;
    sidebarOpen = false;

    constructor(
        public common: CommonService,
        private main: MainService,
        public router: Router,
        private _partner: PartnerService,
        private _fb: FormBuilder,
        private subject: SubjectService,
        public auth: AuthService
    ) {
        this.mapForm = this._fb.group({
            type: ['']
        });
    }

    ngOnInit() {
        this._partner.getTypes().subscribe((dt: any) => {
            this.mapForm.patchValue({type: dt[0]['name']});
            this.partnerTypes = dt;
        });
    }


    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
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


        });
    }


    changeSection(section) {
        this.mapForm.patchValue({type: section});
        this.changePlace(section);
        this.closeSidebar()
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['auth/login']);
    }

    navigateToDashboard() {
        const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
        this.router.navigate([`${role}/dashboard`]);
    }
}
