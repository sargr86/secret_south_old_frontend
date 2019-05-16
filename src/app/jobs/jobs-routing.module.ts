import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowJobsComponent} from './show-jobs/show-jobs.component';

const routes: Routes = [
    {
        path: '',
        component: ShowJobsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule {
}
