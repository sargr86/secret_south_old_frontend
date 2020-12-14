import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {RoutesPricesTableComponent} from '@app/ferries/manage-table-routes/routes-prices-table/routes-prices-table.component';

@Component({
  selector: 'app-manage-map-routes',
  templateUrl: './manage-map-routes.component.html',
  styleUrls: ['./manage-map-routes.component.scss']
})
export class ManageMapRoutesComponent implements OnInit {
  @ViewChild(RoutesPricesTableComponent) tableComponent: RoutesPricesTableComponent;
  routes = [];

  constructor(public common: CommonService) {
    common.dataLoading = false;
  }

  ngOnInit(): void {
  }

  addNewRouteWithoutMap(e) {
    this.tableComponent.generateTableList(e);
  }

  getRoutes(dt) {
    this.routes = dt;
    console.log(dt)
  }

}
