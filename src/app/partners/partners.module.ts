import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PartnersRoutingModule} from './partners-routing.module';
import {MenuComponent} from './menu/menu.component';
import {SharedModule} from '../shared/shared.module';
import {FerriesModule} from '../ferries/ferries.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
         MenuComponent,
         ProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PartnersRoutingModule,
        FerriesModule
    ],
    exports: [
    ]
})
export class PartnersModule {
}
