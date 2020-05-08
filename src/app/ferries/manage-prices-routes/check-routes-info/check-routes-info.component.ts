import { Component, OnInit } from '@angular/core';
import {FerriesService} from '@core/services/ferries.service';

@Component({
  selector: 'app-check-routes-info',
  templateUrl: './check-routes-info.component.html',
  styleUrls: ['./check-routes-info.component.scss']
})
export class CheckRoutesInfoComponent implements OnInit {
  ferryRoutes;
  constructor(
    private ferriesService: FerriesService
  ) { }

  ngOnInit(): void {
    this.ferriesService.getAllRoutes().subscribe(dt =>{
      this.ferryRoutes = dt;
    });
  }

}
