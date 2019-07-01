import {Pipe, PipeTransform} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../services/common.service';

@Pipe({
    name: 'checkFormData'
})
export class CheckFormDataPipe implements PipeTransform {

    constructor(
        private toastr: ToastrService,
        private common: CommonService
    ) {

    }

    /**
     * Checks form data & partner data for existence and display info box
     * @param item current section
     * @param data current section form data
     * @param companies current section partners data
     * @param editCase shows if we're on edit or add mode
     */
    transform(item, data, companies, editCase): any {
        let title = '';
        let msg = '';

        // Checking if at least one partner company present
        if (companies.length === 0) {
            title = 'No companies found.';
            msg = 'Please add at least one ' + item + ' company first.';
        } else if (editCase) {
            if (!data) {
                title = 'Not found';
                msg = 'The selected ' + item + ' is not found.';
            } else if (!data.company) {
                title = 'Partner company not found';
                msg = 'The partner of current ' + item + ' company is no longer available.';
            }
        } else {
            this.toastr.clear();
        }

        // Showing current message to user
        if (title) {
            setTimeout(() => this.toastr.info(msg, title, {timeOut: 0}));
            this.toastr.clear();
        }

    }
}
