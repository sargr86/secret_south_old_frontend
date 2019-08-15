import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FerryService} from '../../shared/services/ferry.service';
import {UsersService} from '../../shared/services/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private _ferries: FerryService,
        private _users: UsersService,
        private _fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.jobCategory = this.routeParams.get('cat') || '';
        const userId = this.routeParams.get('user');

        this.assignFerryForm = this._fb.group({
            user_id: userId,
            full_name: '',
            ferry_id: ''
        });

        this._ferries.getFerries({}).subscribe(dt => {
            this.ferriesList = dt;
            this._users.getUserById({id: userId}).subscribe(d => {
                this.userData = d;
            });
        });


    }

    changeFerry(e) {

    }

}
