import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-manage-table-routes',
  templateUrl: './manage-table-routes.component.html',
  styleUrls: ['./manage-table-routes.component.scss']
})
export class ManageTableRoutesComponent implements OnInit {

  constructor(
    public common: CommonService,
    private dialog: MatDialog
  ) {
    common.dataLoading = false;
  }

  ngOnInit(): void {
  }

  addNewRouteWithoutMap() {
    this.dialog.open(SaveRouteDialogComponent, {
      data: {map: false, coordinates: []},
      width: '700px'
    }).afterClosed().subscribe((dt: any) => {
      this.generateTableList(dt);
    });
  }

}
