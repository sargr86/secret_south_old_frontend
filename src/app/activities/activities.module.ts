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

@NgModule({
    declarations: [
        SaveActivityTypeComponent,
        ShowActivityTypesComponent,
        SaveActivityComponent,
        ShowActivitiesComponent,
        ActivitiesHeaderComponent,
        ActivitiesHomeComponent
    ],
    imports: [
        CommonModule,
        ActivitiesRoutingModule,
        SharedModule
    ],
    exports: [
        SaveActivityTypeComponent,
        ShowActivityTypesComponent
    ],
})
export class ActivitiesModule {
}
