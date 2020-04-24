import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowFerriesComponent} from './show-ferries/show-ferries.component';
import {SaveFerryComponent} from './save-ferry/save-ferry.component';
import {OneFerryResolverService} from '@core/resolvers/one-ferry-resolver.service';
import {FerriesHomeComponent} from './ferries-home/ferries-home.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {ImportEditRoutesPricesComponent} from '@app/ferries/import-edit-routes-prices/import-edit-routes-prices.component';

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
    path: 'add-routes-prices',
    component: ImportEditRoutesPricesComponent,
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
