import {Component, OnInit, ViewChild} from '@angular/core';
import {FerriesService} from '@core/services/ferries.service';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ROUTES_PRICES_TABLE_COLUMNS} from '@core/constants/settings';
import {MatPaginator} from '@angular/material/paginator';
import {GetTableDataSourcePipe} from '@shared/pipes/get-table-data-source.pipe';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {ChangePricesDialogComponent} from '@core/components/dialogs/change-prices-dialog/change-prices-dialog.component';

@Component({
  selector: 'app-manage-prices',
  templateUrl: './manage-prices-routes.component.html',
  styleUrls: ['./manage-prices-routes.component.scss']
})
export class ManagePricesRoutesComponent implements OnInit {


  displayedColumns = ROUTES_PRICES_TABLE_COLUMNS;
  dataSource;
  paginationValues = [10, 25, 100];
  routesWithNoPriceLen = 0;
  routesWithPricesLen = 0;
  routesOnMap;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ferriesService: FerriesService,
    public common: CommonService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public router: Router,
    public auth: AuthService,
    private dataSrc: GetTableDataSourcePipe,
    private dialog: MatDialog
  ) {
    this.common.dataLoading = false;

  }

  ngOnInit() {
    this.getAllRoutesPrices();
    // setTimeout(() => {
    //   this.matTabGroup._tabHeader.updatePagination();
    // }, 0);
  }

  normalizeColName(col): string {
    col = `${col[0].toUpperCase()}${col.slice(1)}`;
    return col.replace(/_/g, ' ');
  }

  getAllRoutesPrices() {
    this.ferriesService.getAllRoutesPrices().subscribe((dt: any) => {
      this.dataSource = this.dataSrc.transform(dt);
      const routesOnly = dt.filter(d => !d.hasOwnProperty('single') && !d.hasOwnProperty('return'));
      this.routesWithNoPriceLen = routesOnly.length;
      const routesWithPrices = dt.filter(d => d.hasOwnProperty('single') || d.hasOwnProperty('return'));
      this.routesWithPricesLen = routesWithPrices.length;
      const routesOnTheMap = dt.filter(d => d.coordinates.length !== 0);
      this.routesOnMap = routesOnTheMap.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  editPrices(row) {
    this.dialog.open(ChangePricesDialogComponent, {data: row, width: '400px'});
  }

  removeRoutePrice(row) {
    this.ferriesService.removeRoutePrice({id: row._id}).subscribe(() => {
      this.toastr.success('The route info has been removed successfully from the map');
      this.getAllRoutesPrices();
    });
  }

  removeAllRoutesPrices() {
    this.ferriesService.removeAllRoutesPrices({}).subscribe(() => {
      this.toastr.success('All routes and their info have been removed successfully from the map');
      this.getAllRoutesPrices();
    });
  }

}
