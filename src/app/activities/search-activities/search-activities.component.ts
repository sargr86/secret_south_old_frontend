import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-search-activities',
  templateUrl: './search-activities.component.html',
  styleUrls: ['./search-activities.component.scss']
})
export class SearchActivitiesComponent implements OnInit {

  activitiesForm: FormGroup;
  isSubmitted = false;
  adultsCount = 2;
  childrenCount = 2;

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }


  constructor(private fb: FormBuilder) {
    this.activitiesForm = this.fb.group({
      date: [''],
      children: [''],
      adults: ['']
    });
  }

  ngOnInit(): void {
  }

  dateChanged(e) {

  }

  adultsCountChanged(e) {

  }

  childrenCountChanged(e) {

  }

  search() {

  }

}
