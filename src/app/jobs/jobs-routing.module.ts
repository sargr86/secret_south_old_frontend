import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowJobsComponent} from './show-jobs/show-jobs.component';
import {AssignJobComponent} from './assign-job/assign-job.component';
import {AdminPagesGuardGuard} from '@core/guards/admin-pages-guard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminPagesGuardGuard]
  },
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
