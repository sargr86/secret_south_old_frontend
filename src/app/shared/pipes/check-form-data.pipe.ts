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
     * @param partners current section partners data
     * @param editCase shows if we're on edit or add mode
     */
    transform(item, data, partners, editCase): any {
        let title = '';
        let msg = '';
        if (partners.length === 0) {
            title = 'No partners found.';
            msg = 'Please add at least one ' + item + ' partner first.';
        } else if (editCase) {
console.log(data)
            if (!data) {
                title = 'Not found';
                msg = 'The selected ' + item + ' is not found';
            } else if (!data.user) {
                title = 'Partner not found';
                msg = 'The partner of current ' + item + ' is no longer available';
            }
        }

        if (title) {

            setTimeout(() => this.toastr.info(msg, title, {timeOut: 0}));
            this.toastr.clear();
        }

    }
}
