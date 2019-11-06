import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomersRoutingModule} from './customers-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ShowCustomersComponent} from './show-customers/show-customers.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
    declarations: [DashboardComponent, ShowCustomersComponent],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        SharedModule
    ]
})
export class CustomersModule {
}
