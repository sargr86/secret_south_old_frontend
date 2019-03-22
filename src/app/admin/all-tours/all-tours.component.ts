import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {ToursService} from "../services/tours.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SPINNER_DIAMETER} from "../../shared/constants/settings";

export interface UserData {
    name: string;
    address: string;
    tours_type_id: string;
}


@Component({
    selector: 'app-all-tours',
    templateUrl: './all-tours.component.html',
    styleUrls: ['./all-tours.component.scss']
})
export class AllToursComponent implements OnInit {

    displayedColumns: string[] = ['name', 'address', 'tours_type_id'];
    dataSource: MatTableDataSource<UserData>;
    dataLoading = false;
    spinnerDiameter: number = SPINNER_DIAMETER;
    filteredData;
    users: any = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient, private router: Router, private tours: ToursService) {

    }

    ngOnInit() {
        if (!this.checkAdmin()) {
            this.router.navigate(['admin-panel']);
        }
        this.getTours();
        // this.dataSource = new MatTableDataSource(this.users);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }

        this.filteredData = this.dataSource.filteredData;
    }

    getTours() {
        this.dataLoading = true;
        this.tours.getAllTours().subscribe((r: any) => {

            if (r.status == 0) {
                alert(r['message']);
                return false;
            }

            r['result'].map(k => this.createNewUser(k));
            r['result'].map(k => this.users.push(k));

            this.dataSource = new MatTableDataSource(this.users);
            this.dataLoading = false;
            this.dataSource.sort = this.sort;

            this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
                if (typeof data[sortHeaderId] === 'string') {
                    return data[sortHeaderId].toLocaleLowerCase();
                }

                return data[sortHeaderId];
            };
        });
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


    createNewUser(k): UserData {

        return {
            name: k.name,
            address: k.address,
            tours_type_id: k.type_name,
        };
    }
}
