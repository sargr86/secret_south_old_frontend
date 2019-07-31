import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Data, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    subscriptions: Subscription[] = [];
    routerUrl = '';

    @Output() toggle = new EventEmitter();

    constructor(
        public router: Router
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe((dt: Data) => {
                this.routerUrl = dt.url;
            })
        );
    }

    toggleSidebar() {
        this.toggle.emit();
    }

}
