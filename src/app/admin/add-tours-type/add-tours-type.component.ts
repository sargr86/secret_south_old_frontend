import {Component, OnInit} from '@angular/core';
import {ToursService} from "../services/tours.service";
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-tours-type',
  templateUrl: './add-tours-type.component.html',
  styleUrls: ['./add-tours-type.component.scss']
})
export class AddToursTypeComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private  tours: ToursService) {
  }

  ngOnInit() {
    if (!this.checkAdmin()) {
      this.router.navigate(['admin-panel']);
    }
  }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  addToursType = {name: ''};

  saveToursType(data) {
    let localStorages = JSON.parse(localStorage.getItem('adminInf'));

    let mixInf = localStorages['admin_session_inf'];
    data['mixinf'] = mixInf;

    this.tours.insertToursType(data).subscribe((r: any) => {

      if (r.status == 0) {
        alert(r['message']);
        return false;
      }

      this.router.navigate(['admin/AllToursType']);
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
}
