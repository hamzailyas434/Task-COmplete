import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserGuard } from '../shared/guards/user-guard';


const routes: Routes = [
  {path:'',component:LayoutComponent,
  children:[
    {path:'',redirectTo:'dashboard'},
    {path:'dashboard',loadChildren:'./dashboard/dashboard.module#DashboardModule'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
