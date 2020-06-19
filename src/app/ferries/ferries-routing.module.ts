import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowFerriesComponent} from './show-ferries/show-ferries.component';
import {SaveFerryComponent} from './save-ferry/save-ferry.component';
import {OneFerryResolverService} from '@core/resolvers/one-ferry-resolver.service';
import {FerriesHomeComponent} from './ferries-home/ferries-home.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {ManageAllComponent} from '@app/ferries/manage-all/manage-all.component';
import {NumericIdGuard} from '@core/guards/numeric-id.guard';
import {AdminPagesGuardGuard} from '@core/guards/admin-pages-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: FerriesHomeComponent,
    canActivate: [AdminPagesGuardGuard]
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
    component: ManageAllComponent
  },
  {
    path: ':id',
    component: SaveFerryComponent,
    resolve: {
      oneFerry: OneFerryResolverService
    },
    canActivate: [NumericIdGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FerriesRoutingModule {
}
