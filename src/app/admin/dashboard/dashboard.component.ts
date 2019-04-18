import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MENU_ITEM_ICONS} from '../../shared/constants/settings';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    menuItemIcons = MENU_ITEM_ICONS;

    constructor(
        public router: Router
    ) {

    }

    ngOnInit(): void {

    }
}