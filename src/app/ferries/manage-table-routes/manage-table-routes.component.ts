import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RoutesPricesTableComponent} from '@app/ferries/manage-table-routes/routes-prices-table/routes-prices-table.component';

@Component({
  selector: 'app-manage-table-routes',
  templateUrl: './manage-table-routes.component.html',
  styleUrls: ['./manage-table-routes.component.scss']
})
export class ManageTableRoutesComponent implements OnInit {

  @ViewChild(RoutesPricesTableComponent) tableComponent: RoutesPricesTableComponent;

  constructor(
    public common: CommonService,
  ) {
    common.dataLoading = false;
  }

  ngOnInit(): void {
  }

  addNewRouteWithoutMap(e) {
    this.tableComponent.generateTableList(e);
  }

  fileImported(e) {
    this.tableComponent.generateTableList(e);
  }

}
