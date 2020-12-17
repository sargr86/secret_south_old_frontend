import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FERRY_PRICES_FILE_DROPZONE_CONFIG, FERRY_ROUTES_FILE_DROPZONE_CONFIG} from '@core/constants/global';
import {FerriesService} from '@core/services/ferries.service';
import {ToastrService} from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-from-file',
  templateUrl: './import-from-file.component.html',
  styleUrls: ['./import-from-file.component.scss']
})
export class ImportFromFileComponent implements OnInit, OnChanges {

  @Input('importMethod') importMethod;
  @Output('fileImported') fileImported = new EventEmitter();
  pricesOnly;
  dropzoneConfig;
  dropzoneMsg;
  dropzoneError;

  constructor(
    private ferriesService: FerriesService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(change) {
    this.importMethod = change.importMethod.currentValue;
    this.pricesOnly = this.importMethod === 'xls';
  }


  importJSONFile(file) {
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = async () => {
      // console.log(typeof fileReader['result'])
      console.log('importing')
      this.ferriesService.importRoutesFile(JSON.parse(fileReader['result'] as any)).subscribe((dt) => {
        this.toastr.success('Ferries routes data imported successfully');
        this.fileImported.emit(dt);
      });
    };
    fileReader.onerror = (error) => {
      // this.toastr.error(error)
      console.log(error);
    };
  }


  importXMLFile(file) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
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
      this.ferriesService.importPricesFile(jsonData).subscribe(dt => {
        this.toastr.success('Ferries prices data imported successfully');
        this.fileImported.emit();
      });
    };
    reader.readAsBinaryString(file);
  }


}
