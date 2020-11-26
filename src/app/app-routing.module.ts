import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NonAuthGuard} from "./core/guards/non-auth.guard";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [NonAuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./features/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'organization',
    loadChildren: () => import('./features/organization-dashboard/organization-dashboard.module').then(m => m.OrganizationDashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
