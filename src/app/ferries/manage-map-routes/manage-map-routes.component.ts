import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-manage-map-routes',
  templateUrl: './manage-map-routes.component.html',
  styleUrls: ['./manage-map-routes.component.scss']
})
export class ManageMapRoutesComponent implements OnInit {

  constructor(public common: CommonService) {
    common.dataLoading = false;
  }

  ngOnInit(): void {
  }

}
