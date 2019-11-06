import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { ShowCompaniesComponent } from './show-companies/show-companies.component';
import { SaveCompanyComponent } from './save-company/save-company.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [ShowCompaniesComponent, SaveCompanyComponent],
    imports: [
        CommonModule,
        CompaniesRoutingModule,
        SharedModule
    ]
})
export class CompaniesModule { }
