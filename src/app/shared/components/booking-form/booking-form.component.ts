import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ALLOWED_COUNTRIES, DEFAULT_COUNTRY} from '../../constants/settings';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
    categoryName;
    itemData;

    timepickerDarkTheme: NgxMaterialTimepickerTheme = {
        container: {
            bodyBackgroundColor: '#164547',
            buttonColor: '#fff'
        },
        dial: {
            dialBackgroundColor: '#164547',
        },
        clockFace: {
            clockFaceBackgroundColor: '#164547',
            clockHandColor: '#08C1C6',
            clockFaceTimeInactiveColor: '#fff'
        }
    };

    foodDrinkForm: FormGroup;
    allowedCountries = ALLOWED_COUNTRIES;
    defaultCountry = DEFAULT_COUNTRY;
    personsCount = 2;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder
    ) {
        this.categoryName = data.section;
        this.itemData = data.item;
    }

    ngOnInit() {
        this.foodDrinkForm = this._fb.group({
            fullName: [''],
            personCount: [2],
            bookingDate: [],
            bookingHour: [''],
            phone: [''],
            email: ['']
        });
    }

    getStartDate() {

    }

    phoneChanged(e) {

    }

    timeChanged(e,p) {
        console.log(p)
        this.foodDrinkForm.patchValue({bookingHour: e});
    }

    personsCountChanged(e) {
        this.personsCount = e;
        this.foodDrinkForm.patchValue({personCount: e});
    }


    saveBooking(data) {
        console.log(data)
    }

}
