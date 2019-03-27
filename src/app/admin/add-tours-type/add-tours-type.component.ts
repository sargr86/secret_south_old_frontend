import {Component, OnInit} from '@angular/core';
import {ToursService} from "../services/tours.service";
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {SPINNER_DIAMETER} from '../../shared/constants/settings';

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

    matcher = new MyErrorStateMatcher();

    addToursType = {name: ''};
    editCase = false;

    spinnerDiameter = SPINNER_DIAMETER;
    formProcessing = false;
    dataLoading = false;

    constructor(
        private http: HttpClient,
        private router: Router,
        private  tours: ToursService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        if (!this.checkAdmin()) {
            this.router.navigate(['admin-panel']);
        }

        const name = this.route.snapshot.paramMap.get('name');
        if (name) {
            this.dataLoading = true;
            this.tours.getOneTourType({name: name}).subscribe((dt: any) => {
                if (dt && dt.length > 0) {
                    dt[0]['name'] = dt[0]['tour_name'];
                    this.addToursType = dt[0];
                    this.editCase = true;
                    this.dataLoading = false;
                }
            });
        }

    }

    nameFormControl = new FormControl('', [
        Validators.required
    ]);


    saveToursType(data) {
        let localStorages = JSON.parse(localStorage.getItem('adminInf'));

        let mixInf = localStorages['admin_session_inf'];
        data['mixinf'] = mixInf;
        this.formProcessing = true;

        if (this.editCase) {
            this.tours.updateToursType(this.addToursType).subscribe((dt => {
                this.formProcessing = false;
                this.router.navigate(['admin/AllToursType']);
            }));
        } else {


            this.tours.insertToursType(data).subscribe((r: any) => {

                if (r.status == 0) {
                    alert(r['message']);
                    return false;
                }
                this.formProcessing = false;
                this.router.navigate(['admin/AllToursType']);
            });
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
}
