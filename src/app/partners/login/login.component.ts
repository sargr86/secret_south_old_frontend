import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  partnerLoginInf = {email: '', pass: ''};

  constructor(private Login: LoginService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  checkLogin(data) {

    this.Login.checkLogin(data).subscribe((r: any) => {

      if (r['status'] == 0) {
        alert('Login/Password invalid');
        return false;
      }

      localStorage.setItem("partnerInf", JSON.stringify(r['result']['partner_inf']));
      this.router.navigate(['/partners/dashboardPage']);
    });
  }

}
