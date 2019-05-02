import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowActivityTypesComponent} from './show-activity-types/show-activity-types.component';
import {SaveActivityTypeComponent} from './save-activity-type/save-activity-type.component';
import {OneAccommodationResolverService} from '../shared/resolvers/one-accommodation-resolver.service';

const routes: Routes = [
  {path: 'show-types', component: ShowActivityTypesComponent},
  {
    path: 'add-types', component: SaveActivityTypeComponent,
    data: {
      title: 'Add activity type',
    },
  },
  {
    path: ':id', component: SaveActivityTypeComponent, data: {
      title: 'Edit an activity type',
    },
    resolve: {
      oneFoodDrink: OneAccommodationResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
