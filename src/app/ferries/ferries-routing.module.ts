import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowFerriesComponent} from './show-ferries/show-ferries.component';
import {SaveFerryComponent} from './save-ferry/save-ferry.component';
import {OneFerryResolverService} from '../shared/resolvers/one-ferry-resolver.service';

const routes: Routes = [
  {
      path: '',
      component: ShowFerriesComponent,
  },
  {
      path: 'add',
      component: SaveFerryComponent,
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
export class FerriesRoutingModule { }
