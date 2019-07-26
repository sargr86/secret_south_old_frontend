import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowCompaniesComponent} from './show-companies/show-companies.component';
import {SaveCompanyComponent} from './save-company/save-company.component';
import {CompanyResolverService} from '../shared/resolvers/company-resolver.service';

const routes: Routes = [
    {
        path: 'show',
        component: ShowCompaniesComponent
    },
    {
        path: 'add',
        component: SaveCompanyComponent
    },
    {
        path: ':id',
        component: SaveCompanyComponent,
        resolve: {

            company: CompanyResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule {
}
