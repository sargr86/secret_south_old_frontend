import {Component, OnInit} from '@angular/core';
import {ContactsService} from '@core/services/contacts.service';

@Component({
  selector: 'app-show-requests',
  templateUrl: './show-requests.component.html',
  styleUrls: ['./show-requests.component.scss']
})
export class ShowRequestsComponent implements OnInit {
  contactRequests;
  displayedColumns = ['company_name', 'email', 'actions'];

  constructor(
    private _contactService: ContactsService
  ) {
  }

  ngOnInit() {
    this.contactRequests = this._contactService.get();
  }

}
