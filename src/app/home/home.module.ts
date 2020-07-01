import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from './main/main.component';
// import {AgmCoreModule} from '@agm/core';

import {SharedModule} from '@shared/shared.module';
import {GOOGLE_API_KEY} from '@core/constants/global';
import {AgmDirectionModule} from 'agm-direction';
import {MapComponent} from './map/map.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
    declarations: [MainComponent, MapComponent, ContactUsComponent],
    imports: [
        SharedModule,
        CommonModule,
        HomeRoutingModule,
        // AgmCoreModule.forRoot({
        //     apiKey: GOOGLE_API_KEY,
        //     libraries: ['places', 'geometry'],
        // }),
        AgmDirectionModule

    ],
    exports: [
        MapComponent
    ]

})
export class HomeModule {
}
