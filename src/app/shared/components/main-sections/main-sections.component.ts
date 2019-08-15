import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Section} from '../../models/Section';
import IsResponsive from '../../helpers/is-responsive';
import {MAIN_SECTIONS} from '../../constants/settings';
import {Data, NavigationEnd, Router} from '@angular/router';
import {MainService} from '../../../home/services/main.service';
import {filter} from 'rxjs/operators';
import {PartnerType} from '../../models/PartnerType';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-main-sections',
    templateUrl: './main-sections.component.html',
    styleUrls: ['./main-sections.component.scss']
})
export class MainSectionsComponent implements OnInit {

    mainSections: Section[] = MAIN_SECTIONS;
    @Input() selectedSection;
    @Output() changeSectionEmit = new EventEmitter();
    @Output() toggleSidebarEmit = new EventEmitter();

    latlng: any = [];
    lat = 0;
    lng = 0;

    responsiveMode;
    subscriptions: Subscription[] = [];
    routerUrl = '';

    constructor(
        public router: Router,
        private main: MainService
    ) {
        this.responsiveMode = IsResponsive.check();
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

    /**
     * Navigates to the specified section
     * @param section selected section name
     */
    changeSection(section) {
        this.router.navigate([section.toLowerCase()]);
        this.closeSidebar();
    }

    closeSidebar() {
        this.toggleSidebarEmit.emit();
    }
}