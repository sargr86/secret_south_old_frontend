import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import moment from 'moment';
import {ActivityTypesService} from '@core/services/activity-types.service';
import {ActivitiesService} from '@core/services/activities.service';
import {map, startWith} from 'rxjs/operators';
import {FilterLocationsForDropdownPipe} from '@shared/pipes/filter-locations-for-dropdown.pipe';

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

  activityProviders;
  activityTypes;
  activitySubTypes;
  filteredLocations;
  locationControl = new FormControl();

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }


  constructor(
    private fb: FormBuilder,
    private activityTypesService: ActivityTypesService,
    private activitiesService: ActivitiesService,
    private filterLocations: FilterLocationsForDropdownPipe
  ) {
    this.activitiesForm = this.fb.group({
      location: [''],
      date: [''],
      type: [''],
      children: [this.childrenCount],
      adults: [this.adultsCount]
    });
  }

  ngOnInit(): void {

    this.getActivityProviders();
    this.getActivityTypes();
    this.getSubtypes();

  }

  getActivityProviders() {
    this.activitiesService.get().subscribe((d: any) => {
      this.activityProviders = d;

      this.filteredLocations = this.locationControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterLocations.transform(value, d))
      );
    });
  }

  getActivityTypes() {
    this.activitiesService.getTypes().subscribe(dt => {
      this.activityTypes = dt;
    });
  }

  getSubtypes() {
    this.activityTypesService.getSubtypes({type_id: this.activityType.value}).subscribe((dt) => {
      this.activitySubTypes = dt;
    });
  }

  clearLocation() {
    this.locationControl.patchValue('');
    this.activitiesForm.patchValue({location: ''});
    this.getActivityProviders();
  }


  dateChanged(e) {
    console.log(e.value)
    this.activitiesForm.patchValue({date: e.value});
  }

  adultsCountChanged(e) {
    this.activitiesForm.patchValue({adults: e});
  }

  childrenCountChanged(e) {
    this.activitiesForm.patchValue({children: e});
  }

  locationChanged(e) {
    this.activitiesForm.patchValue({location: e});
  }

  typeChanged(e) {
    this.activitiesForm.patchValue({type: e.target.value});
    console.log(this.activityType.value)
    this.getSubtypes();
  }

  search() {
    console.log(this.activitiesForm.value)
  }

  get activityType(): AbstractControl {
    return this.activitiesForm.get('type');
  }


}
