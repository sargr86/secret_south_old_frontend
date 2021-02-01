import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {RoutesPricesTableComponent} from '@app/ferries/manage-table-routes/routes-prices-table/routes-prices-table.component';
import {SubjectService} from '@core/services/subject.service';
import {MapControlsComponent} from '@shared/components/map-controls/map-controls.component';

@Component({
  selector: 'app-manage-map-routes',
  templateUrl: './manage-map-routes.component.html',
  styleUrls: ['./manage-map-routes.component.scss']
})
export class ManageMapRoutesComponent implements OnInit {
  @ViewChild(RoutesPricesTableComponent) tableComponent: RoutesPricesTableComponent;
  @ViewChild(MapControlsComponent) mapComponent: MapControlsComponent;
  routes = [];
  filteredRoutes = [];
  selectedRoute;

  pageSize = 10;
  pageIndex = 0;

  constructor(
    public common: CommonService,
    private subject: SubjectService
  ) {
    common.dataLoading = false;
  }

  ngOnInit(): void {
  }

  addNewRouteWithoutMap(e) {
    this.tableComponent.generateTableList(e);
  }

  getRoutes(dt) {
    this.routes = dt;
    this.filterRoutes();
  }

  handle(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterRoutes();
  }

  filterRoutes() {
    this.filteredRoutes = this.routes.slice(this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize);
  }

  selectRoute(r) {
    this.selectedRoute = r;
    this.mapComponent.selectRoute(r);
  }

  fileImported(e) {
    this.getRoutes(e);
    this.mapComponent.getAllRoutes();
  }

}
