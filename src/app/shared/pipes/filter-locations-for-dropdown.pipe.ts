import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterLocationsForDropdown'
})
export class FilterLocationsForDropdownPipe implements PipeTransform {

  transform(value: string, arr: any[]): unknown {
    const filterValue = value.toLowerCase();
    const f = arr.filter(option => option.address.toLowerCase().indexOf(filterValue) === 0);

    // removing duplicates
    return f.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.address === thing.address
      ))
    );
  }

}
