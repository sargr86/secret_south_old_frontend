import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodDrinkService} from '@core/services/food-drink.service';
import {CommonService} from '@core/services/common.service';
import {SINGLE_PAGE_GALLERY_OPTIONS} from '@core/constants/global';
import {SubjectService} from '@core/services/subject.service';
import {NgxGalleryImage} from 'ngx-gallery-9';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-food-drink-single',
  templateUrl: './food-drink-single.component.html',
  styleUrls: ['./food-drink-single.component.scss']
})
export class FoodDrinkSingleComponent implements OnInit {
  foodDrinkProvider;
  foodDrinkForm: FormGroup;
  location;
  galleryOptions = SINGLE_PAGE_GALLERY_OPTIONS;
  personsCount = 2;

  constructor(
    private _food_drink: FoodDrinkService,
    private router: Router,
    private route: ActivatedRoute,
    public common: CommonService,
    private subject: SubjectService,
    private fb: FormBuilder
  ) {
    this.common.dataLoading = false;

    this.foodDrinkForm = this.fb.group({
      location: ['', [Validators.required]],
      guests: [this.personsCount, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });

    this.subject.getFoodDrinkOrderData().subscribe(dt => {
      console.log(dt)
      // this.foodDrinkForm.patchValue(dt);
    });

  }

  ngOnInit() {
    const foodDrinkId = this.route.snapshot.params.id;

    this._food_drink.getOneFoodDrink({id: foodDrinkId}).subscribe(dt => {
      this.foodDrinkProvider = dt;
    });
  }

  getImages() {
    return this.foodDrinkProvider.images as NgxGalleryImage[];
  }

}
