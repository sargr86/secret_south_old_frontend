import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JobsRoutingModule} from './jobs-routing.module';
import {ShowJobsComponent} from './show-jobs/show-jobs.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [ShowJobsComponent],
    imports: [
        CommonModule,
        JobsRoutingModule,
        SharedModule
    ]
})
export class JobsModule {
}
