import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ALLOWED_COUNTRIES, DEFAULT_COUNTRY} from '@core/constants/settings';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import moment from 'moment';

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
    categoryName;
    itemData;
    folder;

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
        this.folder = data.folder;
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

    /**
     * Applying date picker dat to the form field
     * @param e change event
     */
    dateChanged(e) {
        this.foodDrinkForm.patchValue({bookingDate: moment(e).format('YYYY-MM-DD')});
    }

    /**
     * Applying time picker value to the form field
     * @param e change event
     */
    timeChanged(e) {
        this.foodDrinkForm.patchValue({bookingHour: e});
    }

    /**
     * Applying number picker count to the form field
     * @param e change event
     */
    personsCountChanged(e) {
        this.personsCount = e;
        this.foodDrinkForm.patchValue({personCount: e});
    }


    saveBooking(data) {
        console.log(data)
    }

}
