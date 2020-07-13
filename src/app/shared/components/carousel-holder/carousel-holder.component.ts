import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import IsResponsive from '@core/helpers/is-responsive';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carousel-holder',
  templateUrl: './carousel-holder.component.html',
  styleUrls: ['./carousel-holder.component.scss']
})
export class CarouselHolderComponent implements OnInit {

  constructor(
    public router: Router
  ) {
  }

  @Input() items;
  @Input() folder;
  @Input() category;
  responsiveMode;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      768: {
        items: 1
      },
      1000: {
        items: 3
      }
    },
    nav: true
  };

  ngOnInit() {
    this.responsiveMode = IsResponsive.check();
    console.log(this.items)
  }

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }

}
