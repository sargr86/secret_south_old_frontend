import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {ToursService} from "../services/tours.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PartnerService} from "../services/partner.service";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-all-partner',
  templateUrl: './all-partner.component.html',
  styleUrls: ['./all-partner.component.scss']
})
export class AllPartnerComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource: MatTableDataSource<UserData>;
  partners: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient, private router: Router, private partner: PartnerService) {
  }

  ngOnInit() {
    if (!this.checkAdmin()) {
      this.router.navigate(['admin-panel']);
    }
    this.getPartner();
    this.dataSource = new MatTableDataSource(this.partners);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPartner() {
    this.partner.getAllpartner().subscribe((r: any) => {

      if (r.status == 0) {
        alert(r['message']);
        return false;
      }

      r['result'].map(k => this.createNewUser(k));
      r['result'].map(k => this.partners.push(k));

      this.dataSource = new MatTableDataSource(this.partners);
    });
  }

  createNewUser(k): UserData {

    return {
      firstName: k.first_name,
      lastName: k.last_name,
      email: k.email
    };
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
}
