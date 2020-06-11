import {Component, OnInit, ViewChild} from '@angular/core';
import {GetTableDataSourcePipe} from '@shared/pipes/get-table-data-source.pipe';
import {FerriesService} from '@core/services/ferries.service';
import {MatPaginator} from '@angular/material/paginator';
import {CommonService} from '@core/services/common.service';
import {ROUTES_PRICES_TABLE_COLUMNS} from '@core/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';

@Component({
  selector: 'app-routes-prices-table',
  templateUrl: './routes-prices-table.component.html',
  styleUrls: ['./routes-prices-table.component.scss']
})
export class RoutesPricesTableComponent implements OnInit {

  dataSource;
  routesWithNoPriceLen;
  routesWithPricesLen;
  routesOnMap;
  displayedColumns = ROUTES_PRICES_TABLE_COLUMNS;
  paginationValues = [10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dataSrc: GetTableDataSourcePipe,
    private ferriesService: FerriesService,
    public common: CommonService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllRoutesPrices();
  }


  normalizeColName(col): string {
    col = `${col[0].toUpperCase()}${col.slice(1)}`;
    return col.replace(/_/g, ' ');
  }

  getAllRoutesPrices() {
    this.ferriesService.getAllRoutesPrices().subscribe((dt: any) => {
      this.generateTableList(dt);
    });
  }

  checkForCorrespondingRoute(row) {
    if (row['coordinates'] && row['coordinates'].length > 0) {
      return {status: 'yes', className: 'green'};
    }

    return {status: 'no', className: 'red'};
  }

  generateTableList(dt) {
    if (dt) {
      this.dataSource = this.dataSrc.transform(dt);
      const routesOnly = dt.filter(d => !d.hasOwnProperty('single') && !d.hasOwnProperty('return'));
      this.routesWithNoPriceLen = routesOnly.length;
      const routesWithPrices = dt.filter(d => d.hasOwnProperty('single') || d.hasOwnProperty('return'));
      this.routesWithPricesLen = routesWithPrices.length;
      const routesOnTheMap = dt.filter(d => d.coordinates && d.coordinates.length !== 0);
      this.routesOnMap = routesOnTheMap.length;
      this.dataSource.paginator = this.paginator;
    }
  }

  removeRoutePrice(row) {
    this.ferriesService.removeRoutePrice({id: row._id}).subscribe(() => {
      this.toastr.success('The route info has been removed successfully from the map');
      this.getAllRoutesPrices();
    });
  }

  editRoutePrices(row) {
    this.dialog.open(SaveRouteDialogComponent, {data: {route: row, map: false}, width: '800px'});
  }
}
