import {Component, Input, OnInit} from '@angular/core';
import {SPINNER_DIAMETER} from '../../constants/settings';
import {FerryService} from '../../../admin/services/ferry.service';
import {GetTableDataSourcePipe} from '../../pipes/get-table-data-source.pipe';

@Component({
    selector: 'app-mat-table',
    templateUrl: './mat-reusable-table.component.html',
    styleUrls: ['./mat-reusable-table.component.scss']
})
export class MatReusableTableComponent implements OnInit {

    @Input() dataObs;
    @Input() cols;

    displayedColumns;
    spinnerDiameter = SPINNER_DIAMETER;
    dataSource;
    filteredData;
    dataLoading = false;

    constructor(
        private _ferry: FerryService,
        private dataSrc: GetTableDataSourcePipe
    ) {
    }

    ngOnInit() {
        this.displayedColumns = this.cols;
        this.dataLoading = true;
        this.dataObs.subscribe(dt => {
            if (dt.hasOwnProperty('result')) {
                dt = dt['result'];
            }
            this.dataSource = this.dataSrc.transform(dt);
            this.dataLoading = false;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        this.filteredData = this.dataSource.filteredData;
    }

}
