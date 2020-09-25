import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SubjectService} from '@core/services/subject.service';
import {FoodDrinkService} from '@core/services/food-drink.service';
import {FoodDrink} from '@shared/models/FoodDrink';
import {map, startWith} from 'rxjs/operators';
import {FilterLocationsForDropdownPipe} from '@shared/pipes/filter-locations-for-dropdown.pipe';
import moment from 'moment';

@Component({
  selector: 'app-search-food-drink-form',
  templateUrl: './search-food-drink-form.component.html',
  styleUrls: ['./search-food-drink-form.component.scss']
})
export class SearchFoodDrinkFormComponent implements OnInit {

  foodDrinkForm: FormGroup;
  adultsCount = 2;
  childrenCount = 2;
  locationControl = new FormControl();
  foodDrinkObjects: FoodDrink[] = [];

  filteredLocations;
  isSubmitted = false;


  @Output() searchClicked = new EventEmitter();

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }

  constructor(
    public router: Router,
    public auth: AuthService,
    private fb: FormBuilder,
    private subject: SubjectService,
    private foodDrinkService: FoodDrinkService,
    private filterLocations: FilterLocationsForDropdownPipe
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.patchForm();
    this.getFoodDrink();
  }

  initForm() {
    this.foodDrinkForm = this.fb.group({
      location: ['', [Validators.required]],
      guests: [this.adultsCount, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  patchForm() {
    const foodDrinkSearch = JSON.parse(localStorage.getItem('foodDrinkSearch'));
    if (foodDrinkSearch) {
      this.foodDrinkForm.patchValue(foodDrinkSearch);
      this.locationControl.patchValue(foodDrinkSearch.location);
    }
    this.getObjects(foodDrinkSearch);
  }

  getObjects(search) {
    this.foodDrinkService.getByAddress({address: search.location}).subscribe((dt: FoodDrink[]) => {
      this.foodDrinkObjects = dt;
    });
  }

  getFoodDrink() {
    this.foodDrinkService.get({}).subscribe((dt: FoodDrink[]) => {
      this.foodDrinkObjects = dt;
      this.filteredLocations = this.locationControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterLocations.transform(value, dt))
      );
    });
  }

  locationChanged(e) {
    this.foodDrinkForm.patchValue({location: e});
  }

  dateChanged(e) {

  }

  adultsCountChanged(e) {

  }


  childrenCountChanged(e) {

  }

  clearLocation() {
    this.locationControl.patchValue('');
    this.getFoodDrink();
  }

  search() {
    localStorage.setItem('foodDrinkSearch', JSON.stringify(this.foodDrinkForm.value));
    this.searchClicked.emit(this.foodDrinkForm.value);
  }

}
