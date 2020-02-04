import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';
import {SubjectService} from '@core/services/subject.service';
import IsResponsive from '@core/helpers/is-responsive';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  responsiveMode;
  selectedSection;

  @Input() section;

  constructor(
    public auth: AuthService,
    public router: Router,
    private subject: SubjectService
  ) {
  }

  ngOnInit() {
    this.responsiveMode = IsResponsive.check();
    this.selectedSection = this.section;
  }

  /**
   * Navigates to the user dashboard
   */
  navigateToDashboard() {
    const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
    this.router.navigate([`${role}/dashboard/show`]);
  }

  toggleSidebar() {
    this.subject.setSidebarAction('toggle');
  }

}
