import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../../shared/services/companies.service';

@Component({
    selector: 'app-show-companies',
    templateUrl: './show-companies.component.html',
    styleUrls: ['./show-companies.component.scss']
})
export class ShowCompaniesComponent implements OnInit {
    displayedColumns = ['name', 'actions'];
    companies;

    constructor(
        private _companies: CompaniesService
    ) {
    }

    ngOnInit() {
        this.companies = this._companies.get();

    }

}
