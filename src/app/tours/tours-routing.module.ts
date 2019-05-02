import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowToursComponent} from './show-tours/show-tours.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RoleGuard} from '../shared/guards/role.guard';
import {SaveTourComponent} from './save-tour/save-tour.component';
import {OneTourResolverService} from '../shared/resolvers/one-tour-resolver.service';
import {ShowTourTypesComponent} from './show-tour-types/show-tour-types.component';
import {SaveTourTypeComponent} from './save-tour-type/save-tour-type.component';

const routes: Routes = [
  {
    path: '', component: ShowToursComponent, data: {
      title: 'All tours',
    },
  },
  {
    path: 'add', component: SaveTourComponent, data: {
      title: 'Add a new tour',
    },
  },
  {
    path: 'tour/:id', component: SaveTourComponent, data: {
      title: 'Edit a tour info',
    },
    resolve: {
      oneTour: OneTourResolverService
    }
  },
  {
    path: 'show-types', component: ShowTourTypesComponent, data: {
      title: 'All tour types',
      expectedRole: 'admin'
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'tour_type/:id', component: SaveTourTypeComponent, data: {
      title: 'Edit a tour type info',
      expectedRole: 'admin'
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'add-types', component: SaveTourTypeComponent, data: {
      title: 'Add a new tour type',
      expectedRole: 'admin'
    },
    canActivate: [AuthGuard, RoleGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule { }
