import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowActivityTypesComponent} from './show-activity-types/show-activity-types.component';
import {SaveActivityTypeComponent} from './save-activity-type/save-activity-type.component';
import {ShowActivitiesComponent} from './show-activities/show-activities.component';
import {SaveActivityComponent} from './save-activity/save-activity.component';
import {ActivityResolverService} from '@core/resolvers/activity-resolver.service';
import {ActivitiesHomeComponent} from './activities-home/activities-home.component';
import {ActivitiesListComponent} from './activities-list/activities-list.component';
import {ActivitiesSingleComponent} from './activities-single/activities-single.component';
import {NumericIdGuard} from '@core/guards/numeric-id.guard';
import {AdminPagesGuard} from '@core/guards/admin-pages.guard';
import {ActivitySubtypesHomeComponent} from '@app/activities/activity-subtypes-home/activity-subtypes-home.component';
import {ActivitySubtypeResolverService} from '@core/resolvers/activity-subtype-resolver.service';
import {ActivitySingleSubtypeComponent} from '@app/activities/activity-single-subtype/activity-single-subtype.component';
import {OneActivitySubtypeResolverService} from '@core/resolvers/one-activity-subtype-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesHomeComponent,
    canActivate: [AdminPagesGuard]
  },
  {
    path: 'types/:id',
    component: ActivitySubtypesHomeComponent,
    resolve: {
      activity_subtypes: ActivitySubtypeResolverService
    }
  },
  {
    path: 'types/:id/subtypes/:sub_id',
    component: ActivitySingleSubtypeComponent,
    pathMatch: 'full',
    resolve: {
      activity_subtype: OneActivitySubtypeResolverService
    }
  },
  {
    path: 'show',
    component: ShowActivitiesComponent
  },
  {
    path: 'add',
    component: SaveActivityComponent,
    data: {
      title: 'Add an activity provider',
    },
  },
  {
    path: 'single/:id', component: ActivitiesSingleComponent,
    canActivate: [
      NumericIdGuard
    ]
  },
  {
    path: 'list',
    component: ActivitiesListComponent
  },


  {
    path: 'show-types', component: ShowActivityTypesComponent, data: {
      title: 'Show activity types'
    }
  },
  {
    path: 'add-types', component: SaveActivityTypeComponent,
    data: {
      title: 'Add activity type',
    },
  },

  {
    path: 'activity-type/:id', component: SaveActivityTypeComponent, data: {
      title: 'Edit an activity type',
    },
    resolve: {
      // oneFoodDrink: OneAccommodationResolverService
    },
    canActivate: [
      NumericIdGuard
    ]
  },
  {
    path: ':id', component: SaveActivityComponent, data: {
      title: 'Edit an  activity provider info',
    },
    resolve: {
      activity: ActivityResolverService
    },
    canActivate: [
      NumericIdGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {
}
