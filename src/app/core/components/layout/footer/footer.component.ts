import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = moment().format('YYYY');
  constructor() { }

  ngOnInit() {
  }

}
