import {Component, ElementRef, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FoodDrinkService} from "../services/food-drink.service";
import {PartnerService} from "../services/partner.service";
import {MapsAPILoader} from '@agm/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-food-drink',
  templateUrl: './add-food-drink.component.html',
  styleUrls: ['./add-food-drink.component.scss']
})
export class AddFoodDrinkComponent implements OnInit {

  @ViewChild('addSearch')
  public searchelementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private http: HttpClient, private router: Router, private  foodDrinkService: FoodDrinkService, private partner: PartnerService) {
  }

  // partnersTypeName: any = [];
  //
  // nameFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  //
  // latFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  //
  // lngFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  //
  // partnersTypeControl = new FormControl('', [
  //   Validators.required
  // ]);
  //
  // descFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  //
  //
  // foodDrink = {name: '', partner_id: '', desc: '', address: '', img: '', lat: '', lng: ''};
  // upload_images = null;
  //
  ngOnInit() {
    // if (!this.checkAdmin()) {
    //   this.router.navigate(['admin-panel']);
    // }
    // this.getPartners();
    // this.mapsAPILoader.load().then(() => {
    //   const autocomplete = new google.maps.places.Autocomplete(this.searchelementRef.nativeElement, {types: ['geocode']});
    // });
  }
  //
  // getPartners() {
  //   this.partner.getAllpartner().subscribe((r: any) => {
  //
  //     if (r.status == 0) {
  //       alert(r['message']);
  //       return false;
  //     }
  //
  //     r['result'].map(k => this.partnersTypeName.push(k));
  //   });
  // }
  //
  // saveFoodDrink(data) {
  //
  //   const fd = new FormData();
  //
  //   fd.append('lat', data.lat);
  //   fd.append('lng', data.lng);
  //   fd.append('name', data.name);
  //   fd.append('partner_id', data.partner_id);
  //   fd.append('desc', data.desc);
  //   fd.append('address', data.address);
  //   fd.append('upload_image', this.upload_images);
  //   this.foodDrinkService.insertFoodDrink(fd).subscribe((r: any) => {
  //
  //     if (r.status == 0) {
  //       alert(r['message']);
  //       return false;
  //     }
  //
  //     this.router.navigate(['/admin/AllFood-Drink']);
  //   });
  // }
  //
  // handleFileInput(files: FileList) {
  //   this.upload_images = files.item(0);
  // }
  //
  // checkAdmin() {
  //   let jsAdminInf = localStorage.getItem('adminInf');
  //   if (typeof jsAdminInf == 'undefined') {
  //     return false;
  //   }
  //
  //   let adminInf = JSON.parse(jsAdminInf);
  //
  //   if (adminInf == null) {
  //     return false;
  //   }
  //
  //   if (adminInf['admin_session_inf'] == '') {
  //     return false;
  //   }
  //
  //   return true;
  // }
}
