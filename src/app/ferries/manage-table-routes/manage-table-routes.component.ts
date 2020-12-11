import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-manage-table-routes',
  templateUrl: './manage-table-routes.component.html',
  styleUrls: ['./manage-table-routes.component.scss']
})
export class ManageTableRoutesComponent implements OnInit {

  constructor(
    public common: CommonService
  ) {
    common.dataLoading = false;
  }

  ngOnInit(): void {
  }

}
