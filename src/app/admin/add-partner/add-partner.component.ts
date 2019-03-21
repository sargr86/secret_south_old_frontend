import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {PartnerService} from "../services/partner.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private partner: PartnerService) {
  }

  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  typeFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  partnerInf = {firstName: '', lastName: '', email: '', desc: '', pass: '', type: ''};

  ngOnInit() {
    if (!this.checkAdmin()) {
      this.router.navigate(['admin-panel']);
    }
  }

  savePArtner(data) {

    let localStorages = JSON.parse(localStorage.getItem('adminInf'));

    let mixInf = localStorages['admin_session_inf'];
    data['mixinf'] = mixInf;

    this.partner.insertPartner(data).subscribe((r: any) => {

      if (r.status == 0) {
        alert(r['message']);
        return false;
      }

      this.router.navigate(['/admin/AllPartner']);
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
