import {Component, OnDestroy} from '@angular/core';
import {AdminService} from './admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    title = 'Secret South';
    routeSubscription: Subscription;
    pageTitle: string;

    constructor(
        public Admin: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _title: Title,
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


    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }
}