import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course/:id', component: CourseInfoComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
