import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-tours-single',
  templateUrl: './tours-single.component.html',
  styleUrls: ['./tours-single.component.scss']
})
export class ToursSingleComponent implements OnInit {

  constructor(
    public common: CommonService
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit(): void {
  }

}
