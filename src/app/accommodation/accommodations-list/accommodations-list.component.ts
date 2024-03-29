import {Component, OnInit} from '@angular/core';
import {MainService} from '@core/services/main.service';
import {ACCOMMODATIONS_FOLDER} from '@core/constants/global';
import {Accommodation} from '@shared/models/Accommodation';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '@core/services/common.service';
import {FoodDrink} from '@shared/models/FoodDrink';
import {AccommodationsService} from '@core/services/accommodations.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-accommodations-list',
  templateUrl: './accommodations-list.component.html',
  styleUrls: ['./accommodations-list.component.scss']
})
export class AccommodationsListComponent implements OnInit {

  accommodationObjects: Accommodation[];
  accommodationObjectsDropdown: Accommodation[];
  accommodationsFolder = ACCOMMODATIONS_FOLDER;
  accommodationsForm: FormGroup;

  locationControl = new FormControl();
  personsCount = 2;

  filteredLocations;

  constructor(
    private main: MainService,
    private router: Router,
    public common: CommonService,
    private fb: FormBuilder,
    private accommodationsService: AccommodationsService
  ) {
    this.common.dataLoading = false;

    this.accommodationsForm = this.fb.group({
      location: ['', [Validators.required]],
      adults: [this.personsCount, [Validators.required]],
      checkin_date: ['', [Validators.required]],
      checkout_date: ['', [Validators.required]],
    });

  }

  ngOnInit() {

    const accommodationsSearch = JSON.parse(localStorage.getItem('accommodationsSearch'));
    // console.log(accommodationsSearch)
    if (accommodationsSearch) {
      this.accommodationsForm.patchValue(accommodationsSearch);
      this.locationControl.patchValue(accommodationsSearch.location);
    }
    this.getObjects(accommodationsSearch);
  }

  getObjects(search) {

    this.accommodationsService.getByAddress({address: search.location}).subscribe((dt: Accommodation[]) => {
      this.accommodationObjects = dt;
    });
  }

  getStartDate() {

  }

  dateChanged() {

  }

  personsCountChanged(e) {

  }

  locationChanged(e) {
    this.accommodationsForm.patchValue({location: e});
  }

  search(e) {
    console.log(e)
    localStorage.setItem('accommodationsSearch', JSON.stringify(e));
    this.getObjects(e);
  }

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }
}
