import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {FerryService} from "../ferry.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface UserData {
  name: string;
  email: string;
  max_people: number;
  min_people: number;
  phone: string;
  address: string;
}


@Component({
  selector: 'app-all-ferry',
  templateUrl: './all-ferry.component.html',
  styleUrls: ['./all-ferry.component.scss']
})
export class AllFerryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'max_people', 'min_people', 'phone', 'address'];
  dataSource: MatTableDataSource<UserData>;
  users: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private router: Router, private ferry: FerryService) {
    this.getUser();
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (!this.checkAdmin()) {
      this.router.navigate(['admin-panel']);
    }
  }

  getUser() {
    this.ferry.getFerry().subscribe((r: any) => {

      if (r.status == 0) {
        alert(r['message']);
        return false;
      }

      this.users = r['result'].map(k => this.createNewUser(k));

      this.dataSource = new MatTableDataSource(this.users);
    });

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      email: k.email,
      max_people: k.max_people,
      min_people: k.min_people,
      phone: k.phone,
      address: k.address
    };
  }
}
