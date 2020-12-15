import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SubjectService} from '@core/services/subject.service';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FerriesService} from '@core/services/ferries.service';
import {ToastrService} from 'ngx-toastr';
import * as XLSX from 'xlsx';
import {ImportFromFileComponent} from '@app/ferries/manage-routes/routes-page-top/import-from-file/import-from-file.component';

@Component({
  selector: 'app-routes-page-top',
  templateUrl: './routes-page-top.component.html',
  styleUrls: ['./routes-page-top.component.scss']
})
export class RoutesPageTopComponent implements OnInit {
  @Output('newRoute') newRoute = new EventEmitter();
  routesWithNoPriceLen = 0;
  routesWithPricesLen = 0;
  routesOnMap = 0;
  routesOnly;
  @ViewChild(ImportFromFileComponent) fileImport: ImportFromFileComponent;

  constructor(
    private subject: SubjectService,
    private dialog: MatDialog,
  ) {
    this.subject.getFerryRoutesData().subscribe(dt => {
      const routesOnly = dt.filter(d => !d.hasOwnProperty('single') && !d.hasOwnProperty('return'));
      this.routesWithNoPriceLen = routesOnly.length;
      const routesWithPrices = dt.filter(d => d.hasOwnProperty('single') || d.hasOwnProperty('return'));
      this.routesWithPricesLen = routesWithPrices.length;
      const routesOnTheMap = dt.filter(d => d.coordinates && d.coordinates.length !== 0);
      this.routesOnMap = routesOnTheMap.length;
    });


  }

  ngOnInit(): void {
  }

  addNewRouteWithoutMap() {
    this.dialog.open(SaveRouteDialogComponent, {
      data: {map: false, coordinates: []},
      width: '700px'
    }).afterClosed().subscribe((dt: any) => {
      this.newRoute.emit();
    });
  }

  openFileDialog(fileType) {
    this.routesOnly = fileType !== 'json';
    const input = <HTMLInputElement>document.getElementById('import-file');
    input.accept = fileType === 'json' ? 'application/json' : 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    input.click();
  }

  fileSelected(file) {
    if (this.routesOnly) {
      this.fileImport.importXMLFile(file);
    } else {
      this.fileImport.importJSONFile(file);
    }
  }


}
