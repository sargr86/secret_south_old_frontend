import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowCompaniesComponent} from './show-companies/show-companies.component';
import {SaveCompanyComponent} from './save-company/save-company.component';
import {CompanyResolverService} from '@core/resolvers/company-resolver.service';
import {NumericIdGuard} from '@core/guards/numeric-id.guard';
import {AdminPagesGuardGuard} from '@core/guards/admin-pages-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ShowCompaniesComponent,
    canActivate: [AdminPagesGuardGuard]
  },
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
    },
    canActivate: [
      NumericIdGuard
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {
}
