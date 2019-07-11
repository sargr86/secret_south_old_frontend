/// <reference path="../../../../types/index.d.ts"/>
import {Component, ElementRef, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgmInfoWindow, MapsAPILoader} from '@agm/core';
import {MainService} from '../services/main.service';
import * as Base from '../../config.js';
import * as mapStylesData from '../../maps/map_styles2.json';
import {Router} from '@angular/router';
import {PartnerService} from '../../shared/services/partner.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {API_URL, MAIN_SECTIONS, UPLOADS_FOLDER} from '../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SubjectService} from '../../shared/services/subject.service';
import {} from 'googlemaps';
import {Subscription} from 'rxjs';
import {BookingFormComponent} from '../../shared/components/booking-form/booking-form.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: [
        trigger('Fading', [
            state('void', style({opacity: 0})),
            state('*', style({opacity: 1})),
            transition(':enter', animate('400ms ease-out')),
            transition(':leave', animate('400ms ease-in')),
        ])
    ]

})

export class MainComponent implements OnInit {

    lat;
    lng;

    constructor(
        private subject: SubjectService,
    ) {
        this.subject.getMapData().subscribe(dt => {
            this.lng = dt.lng;
            this.lat = dt.lat;
            // this.latlng = dt.latlng;
        });
    }

    ngOnInit(): void {
    }


}
