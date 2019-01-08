import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'dashboard', loadChildren: './account/account.module#DashboardModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);