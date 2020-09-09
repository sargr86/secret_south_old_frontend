import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import {Router} from '@angular/router';
import {FOOTER_LINKS} from '@core/constants/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = moment().format('YYYY');
  footerLinks = FOOTER_LINKS;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

}
