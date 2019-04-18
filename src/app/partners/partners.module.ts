import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PartnersRoutingModule} from './partners-routing.module';
import {LoginComponent} from './login/login.component';

import {
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuComponent} from './menu/menu.component';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [LoginComponent, MenuComponent, PartnerDashboardComponent],
    imports: [
        MatTreeModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSidenavModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        CommonModule,
        PartnersRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ]
})
export class PartnersModule {
}
