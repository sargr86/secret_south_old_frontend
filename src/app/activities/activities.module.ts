import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActivitiesRoutingModule} from './activities-routing.module';
import {SaveActivityTypeComponent} from './save-activity-type/save-activity-type.component';
import {ShowActivityTypesComponent} from './show-activity-types/show-activity-types.component';
import {SharedModule} from '../shared/shared.module';
import { SaveActivityComponent } from './save-activity/save-activity.component';
import { ShowActivitiesComponent } from './show-activities/show-activities.component';
import { ActivitiesHeaderComponent } from './activities-header/activities-header.component';
import { ActivitiesHomeComponent } from './activities-home/activities-home.component';
import {ActivitiesSingleComponent} from './activities-single/activities-single.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';

@NgModule({
    declarations: [
        SaveActivityTypeComponent,
        ShowActivityTypesComponent,
        SaveActivityComponent,
        ShowActivitiesComponent,
        ActivitiesHeaderComponent,
        ActivitiesHomeComponent,
        ActivitiesSingleComponent,
        ActivitiesListComponent
    ],
    imports: [
        CommonModule,
        ActivitiesRoutingModule,
        SharedModule
    ],
    exports: [
        SaveActivityTypeComponent,
        ShowActivityTypesComponent,
        ActivitiesHeaderComponent
    ],
})
export class ActivitiesModule {
}
