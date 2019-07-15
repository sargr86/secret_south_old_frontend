/// <reference path="../../../../types/index.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SubjectService} from '../../shared/services/subject.service';
import {} from 'googlemaps';


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
    currentSection;

    constructor(
        private subject: SubjectService,
    ) {
        this.subject.getMapData().subscribe(dt => {
            this.lng = dt.lng;
            this.lat = dt.lat;
            this.currentSection = dt.section;
            // console.log(dt.section)
            // this.latlng = dt.latlng;
        });
    }

    ngOnInit(): void {
    }


}
