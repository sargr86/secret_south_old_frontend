import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    public router: Router,
    public common: CommonService
  ) {
  }

  ngOnInit() {
    this.common.dataLoading = false;
  }

}
