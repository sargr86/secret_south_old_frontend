import {Component} from '@angular/core';
import {AdminService} from './admin.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(public Admin: AdminService, private router: Router) {}
}
