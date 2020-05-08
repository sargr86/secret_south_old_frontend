import {Component, OnInit} from '@angular/core';
import {FerriesService} from '@core/services/ferries.service';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import {ManageRoutesComponent} from '@app/ferries/manage-routes/manage-routes.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-manage-prices',
  templateUrl: './manage-prices-routes.component.html',
  styleUrls: ['./manage-prices-routes.component.scss']
})
export class ManagePricesRoutesComponent implements OnInit {


  manageRoutesPricesForm: FormGroup;
  currentStep = 1;

  constructor(
    private ferriesService: FerriesService,
    public common: CommonService,
    private toastr: ToastrService,

    private fb: FormBuilder
  ) {
    this.common.dataLoading = false;
    this.manageRoutesPricesForm = this.fb.group({
      previousDataInfo: this.fb.group({}),
      routesData: this.fb.group({}),
      pricesData: this.fb.group({}),
    });
  }

  ngOnInit() {
  }

  stepChanged(e) {
    this.currentStep = e.selectedIndex + 1;
  }



}
