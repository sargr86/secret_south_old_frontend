import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FerriesService} from '@core/services/ferries.service';
import {preventDuplicateLocations} from '@core/helpers/prevent-duplicate-locations';
import {MIN_PEOPLE_ON_FERRY} from '@core/constants/global';
import {CommonService} from '@core/services/common.service';
import {patternValidator} from '@core/helpers/pattern-validator';
import {NUMBERS_ONLY_PATTERN} from '@core/constants/patterns';
import {distinct} from 'rxjs/operators';

@Component({
  selector: 'app-save-route-dialog',
  templateUrl: './save-route-dialog.component.html',
  styleUrls: ['./save-route-dialog.component.scss']
})
export class SaveRouteDialogComponent implements OnInit {

  saveRouteForm: FormGroup;
  locations;
  isSubmitted = false;
  routeName;
  suggestedRoutes;
  fromMap = false;
  totalPrice: number;
  routeData;
  edit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ferriesService: FerriesService,
    private dialog: MatDialogRef<SaveRouteDialogComponent>,
    public common: CommonService
  ) {
    this.fromMap = data.map;
    this.routeData = data.route;
    this.edit = !!this.routeData;
    if (this.fromMap) {

    }


    this.getSuggestedRoutes();

    this.saveRouteForm = this.fb.group({
      // name: ['', Validators.required],
      start_point: ['', Validators.required],
      stop_1: [''],
      stop_2: [''],
      end_point: ['', Validators.required],
      geometry_type: ['LineString'],
      coordinates: [data.coordinates], // Validators.required,
      map: this.fromMap,
      single: ['0', patternValidator(NUMBERS_ONLY_PATTERN)],
      return: ['0', patternValidator(NUMBERS_ONLY_PATTERN)],
      total: [0, Validators.required]
    }, {validators: preventDuplicateLocations('start_point', 'stop_1', 'stop_2', 'end_point')});


    // Edit route case
    if (this.routeData) {
      this.totalPrice = this.routeData.total;
      this.routeName = this.routeData.name;
      this.saveRouteForm.addControl('_id', new FormControl('', Validators.required));
      this.saveRouteForm.patchValue(this.routeData);
      console.log(this.routeData)
      console.log(this.saveRouteForm.value)
    }


  }

  ngOnInit(): void {
    this.ferriesService.getLocations().subscribe(dt => {
      this.locations = dt;
    });

    this.changePricesFormat('single');
    this.changePricesFormat('return');


  }

  changePricesFormat(priceCtrl) {
    const control = this.saveRouteForm.get(priceCtrl);
    control.valueChanges
      .pipe(distinct())
      .subscribe(value => {
        console.log(+value)
        control.setValue(+value || 0);
      });
  }

  getSuggestedRoutes() {
    this.ferriesService.getAllRoutes().subscribe((dt: any) => {
      this.suggestedRoutes = dt;
    });
  }

  saveRoute() {
    this.isSubmitted = true;
    console.log(this.saveRouteForm.value)
    console.log(this.saveRouteForm.valid)
    if (this.saveRouteForm.valid) {
      this.common.formProcessing = true;
      console.log(this.edit)

      this.ferriesService.saveRoutePrice(this.saveRouteForm.value).subscribe(dt => {
        this.common.formProcessing = false;
        this.dialog.close(dt);
      });

    }
  }

  generateRouteName() {
    const startPoint = this.startPoint.value;
    const stop1 = this.stop_1.value;
    const stop2 = this.stop_2.value;
    const endPoint = this.endPoint.value;
    this.routeName = `${startPoint ? startPoint : ''}${stop1 ? ' - ' + stop1 : ''}${stop2 ? ' - ' + stop2 : ''}${endPoint ? ' - ' + endPoint : ''}`;
    this.saveRouteForm.patchValue({name: this.routeName});
  }

  useRouteCoordinates(e) {
    const routeName = e.source.selected._element.nativeElement.innerText;
    const selectedRoute = this.suggestedRoutes.find(r => r.name === routeName);
    this.saveRouteForm.patchValue({coordinates: selectedRoute.coordinates});
  }

  countTotalPrice(ctrl) {
    const changedPrice = +this.saveRouteForm.value[ctrl] || 0;
    console.log(changedPrice)
    this.totalPrice = MIN_PEOPLE_ON_FERRY * changedPrice;
    this.saveRouteForm.patchValue({total: this.totalPrice});
  }

  get startPoint(): AbstractControl {
    return this.saveRouteForm.get('start_point');
  }

  get endPoint(): AbstractControl {
    return this.saveRouteForm.get('end_point');
  }

  get stop_1(): AbstractControl {
    return this.saveRouteForm.get('stop_1');
  }

  get stop_2(): AbstractControl {
    return this.saveRouteForm.get('stop_2');
  }

  get coordinates(): AbstractControl {
    return this.saveRouteForm.get('coordinates');
  }

  get singlePrice(): AbstractControl {
    return this.saveRouteForm.get('single');
  }

  get returnPrice(): AbstractControl {
    return this.saveRouteForm.get('single');
  }

}
