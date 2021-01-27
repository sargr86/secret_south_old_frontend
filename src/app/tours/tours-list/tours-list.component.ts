import {Component, OnInit} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {Router} from '@angular/router';
import {TOURS_FOLDER} from '@core/constants/global';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss']
})
export class ToursListComponent implements OnInit {
  tours = [];
  toursFolder = TOURS_FOLDER;

  constructor(
    private toursService: ToursService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.searchInDailyTours();
  }

  searchInDailyTours() {
    const toursSearch = JSON.parse(localStorage.getItem('toursSearch'));
    if (toursSearch) {
      this.toursService.searchInDailyTours({search: toursSearch.name, date: toursSearch.date}).subscribe((dt: any) => {
        this.tours = dt;
      });
    }
  }

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }

}
