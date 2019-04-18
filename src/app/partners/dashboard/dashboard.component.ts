import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PartnerService} from '../../admin/services/partner.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-partner-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    partnerLinks = ['profile'];

    constructor(
        public router: Router,
        private _partner: PartnerService,
        public _auth: AuthService
    ) {
    }

    ngOnInit() {
        this._partner.getOnePartner({id: this._auth.userData.id}).subscribe(dt => {
            this.partnerLinks.push(dt['partner_type']['name']);
        });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['partners/login']);
    }

}
