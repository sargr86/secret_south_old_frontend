import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';

@Component({
    selector: 'app-tours-home',
    templateUrl: './tours-home.component.html',
    styleUrls: ['./tours-home.component.scss']
})
export class ToursHomeComponent implements OnInit {

    constructor(
        public router: Router,
        public common: CommonService
    ) {
    }

    ngOnInit() {
      this.common.dataLoading = false;
    }

}
