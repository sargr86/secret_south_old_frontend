import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as XLSX from 'xlsx';
import {ToastrService} from 'ngx-toastr';
import {FerriesService} from '@core/services/ferries.service';
import {FERRY_PRICES_FILE_DROPZONE_CONFIG} from '@core/constants/settings';

@Component({
  selector: 'app-add-prices',
  templateUrl: './add-prices.component.html',
  styleUrls: ['./add-prices.component.scss']
})
export class AddPricesComponent implements OnInit {
  ferryPricesData = [];
  dropzoneConfig = FERRY_PRICES_FILE_DROPZONE_CONFIG;
  @Output('updated') pricesUpdated = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private ferriesService: FerriesService
  ) {
  }

  ngOnInit(): void {
  }

  onPricesFileChanged(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev;
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];


        if (name === 'Pricing') {
          const json = XLSX.utils.sheet_to_json(sheet);
          let str = JSON.stringify(json);
          json.map(j => {
            Object.keys(j).map(k => {
              str = str.replace(k, k.replace(/ /g, '_').toLowerCase());
            });
          });

          initial = JSON.parse(str);

        }
        return initial;
      }, {});
      this.ferryPricesData = jsonData;
      const dataString = JSON.stringify(jsonData);
      this.importPrices();
    };
    reader.readAsBinaryString(file);
  }

  importPrices() {
    this.ferriesService.importPricesFile(this.ferryPricesData).subscribe(dt => {
      this.toastr.success('Ferries prices data imported successfully');
      this.pricesUpdated.emit();
    });
  }

}
