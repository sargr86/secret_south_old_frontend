import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PartnersRoutingModule} from './partners-routing.module';
import {MenuComponent} from './menu/menu.component';
import {SharedModule} from '../shared/shared.module';
import {FerriesModule} from '../ferries/ferries.module';
import {ProfileComponent} from './profile/profile.component';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard.component';

@NgModule({
    declarations: [
        MenuComponent,
        ProfileComponent,
        PartnerDashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PartnersRoutingModule,
        FerriesModule
    ],
    exports: []
})
export class PartnersModule {
}
