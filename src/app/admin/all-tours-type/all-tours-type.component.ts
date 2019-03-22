import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {ToursService} from "../services/tours.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SPINNER_DIAMETER} from "../../shared/constants/settings";

export interface UserData {
    name: string;
}

@Component({
    selector: 'app-all-tours-type',
    templateUrl: './all-tours-type.component.html',
    styleUrls: ['./all-tours-type.component.scss']
})
export class AllToursTypeComponent implements OnInit {

    displayedColumns: string[] = ['name'];
    dataSource: MatTableDataSource<UserData>;

    dataLoading = false;
    spinnerDiameter: number = SPINNER_DIAMETER;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    toursType: any = [];
    filteredData;

    constructor(private http: HttpClient, private router: Router, private tours: ToursService) {
        this.getToursType();
        // this.dataSource = new MatTableDataSource(this.toursType);
    }

    ngOnInit() {

        // this.dataSource.sort = this.sort;

        if (!this.checkAdmin()) {
            this.router.navigate(['admin-panel']);
        }
    }

    getToursType() {
        this.dataLoading = true;
        this.tours.getAllTourType().subscribe((r: any) => {

            if (r.status == 0) {
                alert(r['message']);
                return false;
            }

            this.toursType = r['result'].map(k => this.createNewTourType(k));
            this.dataSource = new MatTableDataSource(this.toursType);
            this.dataLoading = false;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
                if (typeof data[sortHeaderId] === 'string') {
                    return data[sortHeaderId].toLocaleLowerCase();
                }

                return data[sortHeaderId];
            };
        });

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        this.filteredData = this.dataSource.filteredData;
    }

    checkAdmin() {
        let jsAdminInf = localStorage.getItem('adminInf');
        if (typeof jsAdminInf == 'undefined') {
            return false;
        }

        let adminInf = JSON.parse(jsAdminInf);

        if (adminInf == null) {
            return false;
        }

        if (adminInf['admin_session_inf'] == '') {
            return false;
        }

        return true;
    }

    createNewTourType(k): UserData {
        return {
            name: k.tour_name,
        };
    }

}
