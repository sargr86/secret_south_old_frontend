import {Pipe, PipeTransform} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../services/common.service';

@Pipe({
    name: 'showFormMessage'
})
export class ShowFormMessagePipe implements PipeTransform {

    constructor(
        public router: Router,
        private toastr: ToastrService,
        private common: CommonService
    ) {

    }

    transform(item: any, edit: any, url: string): any {
        this.router.navigate([url]);

        const msg = `The ${item} info has been ${edit ? 'updated' : 'added'} successfully.`;

        this.toastr.success(msg, edit ? 'Updated!' : 'Added!');
        this.common.formProcessing = false;
    }

}
