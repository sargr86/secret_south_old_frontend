import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FerriesService} from '@core/services/ferries.service';
import {UsersService} from '@core/services/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-assign-job',
  templateUrl: './assign-job.component.html',
  styleUrls: ['./assign-job.component.scss']
})
export class AssignJobComponent implements OnInit {

  jobCategory;
  routeParams: ParamMap = this.route.snapshot.paramMap;
  assignFerryForm: FormGroup;
  userData;
  ferriesList;
  driversList;
  selectedDriver;
  selectedFerry;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private _ferries: FerriesService,
    private _users: UsersService,
    private _fb: FormBuilder,
    public common: CommonService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.jobCategory = this.routeParams.get('cat') || '';
    const userId = this.routeParams.get('user');


    this.assignFerryForm = this._fb.group({
      driver_id: userId,
      ferry_id: ''
    });

    this._ferries.getFerries({}).subscribe(dt => {
      this.ferriesList = dt;
      this._users.getUsersByRole({position: 'Driver'}).subscribe(d => {
        this.driversList = d;
        this.common.dataLoading = false;
      });
    });


  }

  changeFerry(e) {
    this.selectedFerry = e.source.selected.viewValue;
  }

  changeDriver(e) {
    this.selectedDriver = e.source.selected.viewValue;
  }

  assignDriverToFerry() {
    this._ferries.assignDriver(this.assignFerryForm.value).subscribe(dt => {
      this.toastr.success(`<strong>${this.selectedDriver}</strong> will drive
        <strong>${this.selectedFerry}</strong>`, 'Success!', {enableHtml: true});
    });
  }

}
