import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowJobsComponent} from './show-jobs/show-jobs.component';
import {AssignJobComponent} from './assign-job/assign-job.component';

const routes: Routes = [
    {
        path: 'show',
        component: ShowJobsComponent
    },
    {
        path: 'assign',
        component: AssignJobComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule {
}
