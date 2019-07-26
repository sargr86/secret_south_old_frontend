import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-carousel-holder',
    templateUrl: './carousel-holder.component.html',
    styleUrls: ['./carousel-holder.component.scss']
})
export class CarouselHolderComponent implements OnInit {

    constructor() {
    }

    @Input() items;
    @Input() folder;
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
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
        // console.log(this.items)
    }

}
