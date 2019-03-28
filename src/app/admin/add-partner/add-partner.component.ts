import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {PartnerService} from "../services/partner.service";
import {SPINNER_DIAMETER} from '../../shared/constants/settings';

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
    spinnerDiameter = SPINNER_DIAMETER;
    dataLoading = false;
    formProcessing = false;
    editCase = false;

    constructor(
        private http: HttpClient,
        private router: Router,
        private partner: PartnerService,
        private route: ActivatedRoute
    ) {
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

    partnerInf = {first_name: '', last_name: '', email: '', desc: '', pass: '', type: ''};

    ngOnInit() {
        if (!this.checkAdmin()) {
            this.router.navigate(['admin-panel']);
        }
        const partner_id = this.route.snapshot.paramMap.get('id');
        if (partner_id) {
            this.partner.getOnePartner({id: partner_id}).subscribe(dt => {
                this.partnerInf = dt['result'][0];
                this.editCase = true;
            });
        }
    }

    savePartner(data) {

        if (this.editCase) {

            this.partner.updatePartnerInfo(data).subscribe(dt => {
                this.router.navigate(['/admin/AllPartner']);
            });

        } else {
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
