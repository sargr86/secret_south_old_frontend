import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from './main/main.component';
import {AgmCoreModule} from '@agm/core';

import {SharedModule} from '../shared/shared.module';
import {LayoutModule} from '../layout/layout.module';
import {GOOGLE_API_KEY} from '../shared/constants/settings';
import {AgmDirectionModule} from 'agm-direction';
import {MapComponent} from './map/map.component';

@NgModule({
    declarations: [MainComponent, MapComponent],
    imports: [
        SharedModule,
        CommonModule,
        HomeRoutingModule,
        LayoutModule,
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_API_KEY,
            libraries: ['places', 'geometry'],
        }),
        AgmDirectionModule

    ],
    exports: [
        MapComponent
    ]

})
export class HomeModule {
}
