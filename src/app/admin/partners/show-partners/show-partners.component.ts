import {Component, OnInit} from '@angular/core';
import {PartnerService} from '../../../shared/services/partner.service';
import {PARTNERS_TABLE_COLUMNS} from '../../../shared/constants/settings';

@Component({
    selector: 'app-show-partners',
    templateUrl: './show-partners.component.html',
    styleUrls: ['./show-partners.component.scss']
})
export class ShowPartnersComponent implements OnInit {
    partners;
    displayedColumns: string[] = PARTNERS_TABLE_COLUMNS;
    constructor(
        private _partner: PartnerService
    ) {
        // @todo test all admin routes as they are changed, check mat-table (e.g change _ferry to _ferries)
    }

    ngOnInit() {
        this.partners = this._partner.getAllpartner();
    }

}
