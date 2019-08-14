import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {AdminService} from './admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {AuthService} from './shared/services/auth.service';
import {PartnerService} from './shared/services/partner.service';
import {MatSidenav} from '@angular/material';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
    title = 'Secret South';
    routeSubscription: Subscription;
    pageTitle: string;


    sidenav: MatSidenav;

    constructor(
        public Admin: AdminService,
        public router: Router,
        private route: ActivatedRoute,
        private _title: Title,
        public _auth: AuthService,
        private cdr: ChangeDetectorRef
    ) {


        // Getting current page title
        this.routeSubscription = this.router.events.pipe(map(() => {
            let child = this.route.firstChild;
            while (child) {
                if (child.firstChild) {
                    child = child.firstChild;
                } else if (child.snapshot.data && child.snapshot.data['title']) {
                    return child.snapshot.data['title'];
                } else {
                    return null;
                }
            }
            return null;
        })).subscribe(title => {
            this.pageTitle = title;
            this.setPageTitle();
            // this.sidenav.toggle();
            // this._subject.setPageTitle(title)
        });


    }


    /**
     * Sets current page title
     */
    setPageTitle() {
        if (this.pageTitle) {
            this._title.setTitle(this.pageTitle);
        }
    }

    getMode(sidenav) {

        // sidenav.toggle();
        if (this.responsiveMode && screen.width < 1060 && !this.router.url.includes('auth')) {
            return 'over';
        } else {
            return 'side';
        }
    }

    checkDashboardPage() {
        return /admin|partner|employee|customers/.test(this.router.url);
    }

    get responsiveMode() {

        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    closeSidenav(sidenav) {
        if (this.responsiveMode) {
            sidenav.close();
        }
    }


    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }
}
