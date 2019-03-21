import {Component, OnInit, Input, ViewChild, NgZone, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FerryService} from "../ferry.service";
import {MapsAPILoader} from '@agm/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-ferry',
  templateUrl: './add-ferry.component.html',
  styleUrls: ['./add-ferry.component.scss']
})
export class AddFerryComponent implements OnInit {

  @ViewChild('addSearch')
  public searchelementRef: ElementRef;
  public searchcontrol: any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngzone: NgZone, private http: HttpClient, private router: Router, private ferry: FerryService) {
  }

  tourType: any = [];

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  maxPeopleFormControl = new FormControl('', [
    Validators.required
  ]);

  minPeopleFormControl = new FormControl('', [
    Validators.required
  ]);

  typeFormControl = new FormControl('', [
    Validators.required
  ]);

  partnersTypeControl = new FormControl('', [
    Validators.required
  ]);


  matcher = new MyErrorStateMatcher();

  addFerry = {name: '', email: '', maxPeople: '', minPeople: '', phone: '', address: '', type: '', partner_id: ''};
  partnersTypeName: any = [];

  ngOnInit() {
    if (!this.checkAdmin()) {
      this.router.navigate(['admin-panel']);
    }
    this.getPartners();
    this.searchcontrol = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchelementRef.nativeElement, {types: ['geocode']});
    });
  }

  getPartners() {
    this.ferry.getAllpartner().subscribe((r: any) => {

      if (r.status == 0) {
        alert(r['message']);
        return false;
      }

      r['result'].map(k => this.partnersTypeName.push(k));
    });
  }

  saveFerry(data) {
    this.ferry.insertFerry(data).subscribe((r: any) => {

      if (r.status == 0) {
        alert(r['message']);
        return false;
      }

      this.router.navigate(['/admin/AllFerry']);
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
