import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'filterEndCheckoutDates'
})
export class FilterEndCheckoutDatesPipe implements PipeTransform {

  transform(d: Date | null, startDate) {
    return moment(d).isSameOrAfter(moment(startDate), 'day');
  }
}
