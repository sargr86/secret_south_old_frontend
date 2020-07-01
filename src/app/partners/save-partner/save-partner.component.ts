import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PartnerService} from '@core/services/partner.service';
import {ToastrService} from 'ngx-toastr';
import {ALLOWED_COUNTRIES, DEFAULT_COUNTRY, SPINNER_DIAMETER} from '@core/constants/global';
import {CommonService} from '@core/services/common.service';
import {patternValidator} from '@core/helpers/pattern-validator';
import {EMAIL_PATTERN} from '@core/constants/patterns';
import {PartnerType} from '@shared/models/PartnerType';
import {Partner} from '@shared/models/Partner';

@Component({
  selector: 'app-save-partner',
  templateUrl: './save-partner.component.html',
  styleUrls: ['./save-partner.component.scss']
})
export class SavePartnerComponent implements OnInit {

  partnersFields = {
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]],
    partner_type_id: ['', Validators.required],
    phone: ['', [Validators.required]],
    id: ''
  };
  savePartnerForm: FormGroup;
  editCase = false;
  partnerInfo: Partner;
  spinnerDiameter = SPINNER_DIAMETER;
  allowedCountries = ALLOWED_COUNTRIES;
  defaultCountry = DEFAULT_COUNTRY;
  redirectUrl = 'admin/partners/show';
  partnerType: PartnerType;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private _partner: PartnerService,
    private router: Router,
    private toastr: ToastrService,
    public common: CommonService,
  ) {
    if (!this.editCase) {
      this.partnersFields['pass'] = ['', Validators.required];
    }
    this.savePartnerForm = this._fb.group(this.partnersFields);

    this._partner.getTypes().subscribe(d => {
      this.partnerType = d;
    });

    const partner_id = this.route.snapshot.paramMap.get('id');
    if (partner_id) {
      this.common.dataLoading = true;
      this.editCase = true;

      this._partner.getOnePartner({id: partner_id}).subscribe(dt => {

        this.partnerInfo = dt;
        delete this.partnersFields['pass'];
        this.savePartnerForm = this._fb.group(this.partnersFields);
        this.savePartnerForm.patchValue(this.partnerInfo);
        this.common.dataLoading = false;
      });


    }
    this.common.dataLoading = false;

  }

  ngOnInit() {
  }

  /**
   * Adds or updates a partner info
   */
  savePartner() {
    const data = this.savePartnerForm.value;
    this.common.formProcessing = true;
    if (this.editCase) {

      this._partner.updatePartnerInfo(data).subscribe(() => {
        this.toastr.success('Partner info has been updated successfully');
        this.router.navigate([this.redirectUrl]);
        this.common.formProcessing = false;
      });

    } else {
      this._partner.insertPartner(data).subscribe(() => {
        this.toastr.success('Partner info has been added successfully');
        this.router.navigate([this.redirectUrl]);
        this.common.formProcessing = false;
      });
    }
  }

  get showForm() {
    return !this.common.dataLoading && (!this.editCase || (this.partnerInfo && this.editCase));
  }

  get firstNameCtrl() {
    return this.savePartnerForm.get('first_name');
  }

  get lastNameCtrl() {
    return this.savePartnerForm.get('last_name');
  }

  get emailCtrl() {
    return this.savePartnerForm.get('email');
  }

  get phoneCtrl() {
    return this.savePartnerForm.get('phone');
  }

  changed(e) {
    this.savePartnerForm.patchValue({'phone': e.target.value});
  }


}
