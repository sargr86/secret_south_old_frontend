import {Component, OnInit} from '@angular/core';
import {ContactsService} from '@core/services/contacts.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-request-body',
  templateUrl: './show-request-body.component.html',
  styleUrls: ['./show-request-body.component.scss']
})
export class ShowRequestBodyComponent implements OnInit {
  requestInfo;

  constructor(
    private _contactService: ContactsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot ? this.route.snapshot.params.id : '';
    this._contactService.getOne(id).subscribe(dt => {
      this.requestInfo = dt;
    });
  }

}
