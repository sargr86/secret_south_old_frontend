import {Component, OnInit} from '@angular/core';
import {AdminLoginService} from "../admin-login.service";
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private adminLogin: AdminLoginService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  adminInf = [];

  adminLoginInf = {email: '', pass: ''};

  checkLogin(data) {

    this.adminLogin.checkLogin(data).subscribe((r: any) => {

      if (r['status'] == 0) {
        alert('Login/Password invalid');
        return false;
      }

      this.adminInf.push(r['admin_inf']);
      localStorage.setItem("adminInf", JSON.stringify(r['result']['admin_inf']));
      this.router.navigate(['/admin/dashboard']);
    });
  }

}
