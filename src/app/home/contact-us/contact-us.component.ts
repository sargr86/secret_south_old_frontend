import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';
import IsResponsive from '@core/helpers/is-responsive';
import {ContactsService} from '@core/services/contacts.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  selectedSection = 'ferries';
  responsiveMode = IsResponsive.check();

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public router: Router,
    private _contactsService: ContactsService,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      company_name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
  }


  navigateToDashboard() {
    const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
    this.router.navigate([`${role}/dashboard/show`]);
  }

  sendContactRequest() {
    this._contactsService.request(this.contactForm.value).subscribe(dt => {
      this.toastr.success('Please wait for invitation email arrival.', 'The contact has been requested successfully.');
      this.router.navigate(['/']);
    });
  }

}
