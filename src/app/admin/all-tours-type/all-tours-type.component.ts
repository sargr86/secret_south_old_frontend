import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {ToursService} from "../services/tours.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  toursType: any = [];

  constructor(private http: HttpClient, private router: Router, private tours: ToursService) {
    this.getToursType();
    this.dataSource = new MatTableDataSource(this.toursType);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (!this.checkAdmin()) {
      this.router.navigate(['admin-panel']);
    }
  }

  getToursType() {
    this.tours.getAllTourType().subscribe((r: any) => {

      if (r.status == 0) {
        alert(r['message']);
        return false;
      }

      this.toursType = r['result'].map(k => this.createNewTourType(k));

      this.dataSource = new MatTableDataSource(this.toursType);
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

  createNewTourType(k): UserData {
console.log(k)
    return {
      name: k.tour_name,
    };
  }

}
