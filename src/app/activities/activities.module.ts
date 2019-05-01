import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActivitiesRoutingModule} from './activities-routing.module';
import {SaveActivityTypeComponent} from './save-activity-type/save-activity-type.component';
import {ShowActivityTypesComponent} from './show-activity-types/show-activity-types.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        SaveActivityTypeComponent,
        ShowActivityTypesComponent
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
