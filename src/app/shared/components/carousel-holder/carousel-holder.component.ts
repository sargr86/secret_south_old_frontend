import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import IsResponsive from '@core/helpers/is-responsive';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-holder',
  templateUrl: './carousel-holder.component.html',
  styleUrls: ['./carousel-holder.component.scss']
})
export class CarouselHolderComponent implements OnInit {

  constructor(
    public router: Router,
    public sanitizer: DomSanitizer
  ) {
  }

  @Input() items;
  @Input() folder;
  @Input() category;
  responsiveMode;
  customOptions: OwlOptions = {
    loop: false,
    // margin: 10,
    nav: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      0: {
        items: 1
      },
      767: {
        items: 3
      },
      1200: {
        items: 3
      }
    }
  };

  ngOnInit() {
    this.responsiveMode = IsResponsive.check();
  }

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }

}
