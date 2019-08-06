import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowActivityTypesComponent} from './show-activity-types/show-activity-types.component';
import {SaveActivityTypeComponent} from './save-activity-type/save-activity-type.component';
import {ShowActivitiesComponent} from './show-activities/show-activities.component';
import {SaveActivityComponent} from './save-activity/save-activity.component';
import {ActivityResolverService} from '../shared/resolvers/activity-resolver.service';
import {ActivitiesHomeComponent} from './activities-home/activities-home.component';

const routes: Routes = [
    {
        path: '',
        component: ActivitiesHomeComponent
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
        }
    },
    {
        path: ':id', component: SaveActivityComponent, data: {
            title: 'Edit an  activity provider info',
        },
        resolve: {
            activity: ActivityResolverService
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivitiesRoutingModule {
}
