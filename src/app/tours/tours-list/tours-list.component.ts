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
  toursSearch;
  selectedOrder = 'asc';

  constructor(
    private toursService: ToursService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.searchInDailyTours();
  }

  searchInDailyTours() {
    this.toursSearch = JSON.parse(localStorage.getItem('toursSearch'));
    if (this.toursSearch) {
      this.toursService.searchInDailyTours({
        search: this.toursSearch.name,
        date: this.toursSearch.date
      }).subscribe((dt: any) => {
        this.tours = dt;
      });
    }
  }

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }

  sortByPrice(order) {
    this.selectedOrder = order;
    this.toursService.searchInDailyTours({
      search: this.toursSearch.name,
      date: this.toursSearch.date,
      order
    }).subscribe((dt: any) => {
      this.tours = dt;
    });
  }
}
