import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowFerriesComponent} from './show-ferries/show-ferries.component';
import {SaveFerryComponent} from './save-ferry/save-ferry.component';
import {OneFerryResolverService} from '@core/resolvers/one-ferry-resolver.service';
import {FerriesHomeComponent} from './ferries-home/ferries-home.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {ManagePricesRoutesComponent} from '@app/ferries/manage-prices-routes/manage-prices-routes.component';
import {ManageAllComponent} from '@app/ferries/manage-all/manage-all.component';

const routes: Routes = [
  {
    path: '',
    component: FerriesHomeComponent
  },
  {
    path: 'show',
    component: ShowFerriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: SaveFerryComponent,
  },
  {
    path: 'manage-routes-prices',
    component: ManagePricesRoutesComponent
  },
  {
    path: 'manage-all',
    component: ManageAllComponent
  },
  {
    path: ':id',
    component: SaveFerryComponent,
    resolve: {
      oneFerry: OneFerryResolverService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FerriesRoutingModule {
}
