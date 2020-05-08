import { Component, OnInit } from '@angular/core';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-manage-routes',
  templateUrl: './manage-routes.component.html',
  styleUrls: ['./manage-routes.component.scss']
})
export class ManageRoutesComponent implements OnInit {

  constructor(
    public common: CommonService
  ) { }

  ngOnInit(): void {
    this.common.dataLoading = false;
  }

}
