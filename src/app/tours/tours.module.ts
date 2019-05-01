import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToursRoutingModule} from './tours-routing.module';
import {ShowToursComponent} from './show-tours/show-tours.component';
import {SharedModule} from '../shared/shared.module';
import {SaveTourComponent} from './save-tour/save-tour.component';
import {ShowTourTypesComponent} from './show-tour-types/show-tour-types.component';
import {SaveTourTypeComponent} from './save-tour-type/save-tour-type.component';

@NgModule({
    declarations: [
        ShowToursComponent,
        SaveTourComponent,
        ShowTourTypesComponent,
        SaveTourTypeComponent
    ],
    imports: [
        CommonModule,
        ToursRoutingModule,
        SharedModule
    ],
    exports: [
        ShowToursComponent,
        SaveTourComponent,
        ShowTourTypesComponent,
        SaveTourTypeComponent
    ]
})
export class ToursModule {
}
