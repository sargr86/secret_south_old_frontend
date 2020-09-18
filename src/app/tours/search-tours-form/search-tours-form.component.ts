import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-search-tours-form',
  templateUrl: './search-tours-form.component.html',
  styleUrls: ['./search-tours-form.component.scss']
})
export class SearchToursFormComponent implements OnInit {
  toursForm: FormGroup;

  filteredLocations;
  locationControl = new FormControl();

  adultsCount = 2;
  childrenCount = 2;

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.patchForm();
    this.getTours();
  }

  initForm() {
    this.toursForm = this.fb.group({
      location: ['', [Validators.required]],
      adults: [this.adultsCount, [Validators.required]],
      children: [this.childrenCount, [Validators.required]],
      rooms: ['', [Validators.required]],
      date: ['', [Validators.required]],
      tour_type: ['', [Validators.required]],
    });
  }

  patchForm() {
    const accommodationsSearch = JSON.parse(localStorage.getItem('toursSearch'));


    if (accommodationsSearch) {
      this.adultsCount = accommodationsSearch.adults;
      this.childrenCount = accommodationsSearch.children;
      this.toursForm.patchValue(accommodationsSearch);
      this.locationControl.patchValue(accommodationsSearch.location);
    }
  }

  dateChanged(e) {
    this.toursForm.patchValue({date: e.value});
  }

  adultsCountChanged(e) {
    this.toursForm.patchValue({adults: e});
  }

  childrenCountChanged(e) {
    this.toursForm.patchValue({children: e});
  }


  locationChanged(e) {
    this.toursForm.patchValue({location: e});
  }

  clearLocation() {
    this.locationControl.patchValue('');
    this.getTours();
  }

  getTours() {

  }

  search() {
    console.log(this.toursForm.value)
  }


}
