import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowFerriesComponent} from '../ferries/show-ferries/show-ferries.component';
import {MainDashboardComponent} from '../shared/components/main-dashboard/main-dashboard.component';
import {SaveFerryComponent} from '../ferries/save-ferry/save-ferry.component';
import {ShowProfileComponent} from './show-profile/show-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {OneFerryResolverService} from '../shared/resolvers/one-ferry-resolver.service';
import {ShowToursComponent} from '../tours/show-tours/show-tours.component';
import {SaveTourComponent} from '../tours/save-tour/save-tour.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {OneTourResolverService} from '../shared/resolvers/one-tour-resolver.service';
import {ShowTourTypesComponent} from '../tours/show-tour-types/show-tour-types.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: ShowProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/show',
        component: ShowProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/edit',
        component: EditProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ferries/show',
        component: ShowFerriesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ferries/add',
        component: SaveFerryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ferry/:id',
        component: SaveFerryComponent,
        resolve: {
            oneFerry: OneFerryResolverService
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'tours/show',
        component: ShowToursComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tours/show-types',
        component: ShowTourTypesComponent,
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'tours/add',
    //     component: SaveTourComponent,
    //     canActivate: [ AuthGuard]
    // },
    // {
    //     path: 'tour/:id',
    //     component: SaveTourComponent,
    //     resolve: {
    //         oneTour: OneTourResolverService
    //     },
    //     canActivate: [ AuthGuard]
    // },
    {
        path: 'accommodations/show',
        component: ShowToursComponent,
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'accommodations/add',
    //     component: SaveTourComponent,
    //     canActivate: [ AuthGuard]
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule {
}
