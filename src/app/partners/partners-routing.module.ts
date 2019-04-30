import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowFerriesComponent} from '../ferries/show-ferries/show-ferries.component';
import {MainDashboardComponent} from '../shared/components/main-dashboard/main-dashboard.component';
import {SaveFerryComponent} from '../ferries/save-ferry/save-ferry.component';
import {ShowProfileComponent} from './show-profile/show-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {OneFerryResolverService} from '../shared/resolvers/one-ferry-resolver.service';


const routes: Routes = [
    {path: 'dashboard', component: MainDashboardComponent},
    {path: 'dashboard/show', component: ShowProfileComponent},
    {path: 'dashboard/edit', component: EditProfileComponent},
    {
        path: 'ferries/show',
        component: ShowFerriesComponent
    },
    {
        path: 'ferries/add',
        component: SaveFerryComponent
    },
    {
        path: 'ferry/:id',
        component: SaveFerryComponent,
        resolve: {
            oneFerry: OneFerryResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule {
}
