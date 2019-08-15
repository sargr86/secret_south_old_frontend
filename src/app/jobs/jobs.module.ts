import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JobsRoutingModule} from './jobs-routing.module';
import {ShowJobsComponent} from './show-jobs/show-jobs.component';
import {SharedModule} from '../shared/shared.module';
import {AssignJobComponent} from './assign-job/assign-job.component';

@NgModule({
    declarations: [ShowJobsComponent, AssignJobComponent],
    imports: [
        CommonModule,
        JobsRoutingModule,
        SharedModule
    ]
})
export class JobsModule {
}
