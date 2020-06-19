import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowToursComponent} from './show-tours/show-tours.component';
import {SaveTourComponent} from './save-tour/save-tour.component';
import {OneTourResolverService} from '@core/resolvers/one-tour-resolver.service';
import {ShowTourTypesComponent} from './show-tour-types/show-tour-types.component';
import {SaveTourTypeComponent} from './save-tour-type/save-tour-type.component';
import {ToursHomeComponent} from './tours-home/tours-home.component';
import {NumericIdGuard} from '@core/guards/numeric-id.guard';
import {AdminPagesGuardGuard} from '@core/guards/admin-pages-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ToursHomeComponent,
    canActivate: [AdminPagesGuardGuard]
  },
  {
    path: 'show', component: ShowToursComponent, data: {
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
    },
    canActivate: [
      NumericIdGuard
    ]
  },
  {
    path: 'show-types', component: ShowTourTypesComponent, data: {
      title: 'All tour types',
    },
  },
  {
    path: 'tour-type/:id', component: SaveTourTypeComponent, data: {
      title: 'Edit a tour type info',
    },
    canActivate: [
      NumericIdGuard
    ]
  },
  {
    path: 'add-types', component: SaveTourTypeComponent, data: {
      title: 'Add a new tour type',
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule {
}
