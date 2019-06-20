import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
    categoryName;
    itemData;
    foodDrinkForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder
    ) {
        console.log(data)
        this.categoryName = data.section;
        this.itemData = data.item;
    }

    ngOnInit() {
        this.foodDrinkForm = this._fb.group({
            personCount: [2],
            bookingDate: [],
            bookingHour: ['']

        });
    }

}
