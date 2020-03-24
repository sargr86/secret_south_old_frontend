import { Component, OnInit } from '@angular/core';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public common: CommonService
  ) { }

  ngOnInit() {
    this.common.dataLoading = false;
  }

}
