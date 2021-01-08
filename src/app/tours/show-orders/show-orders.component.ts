import {Component, OnInit} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {CommonService} from '@core/services/common.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}
