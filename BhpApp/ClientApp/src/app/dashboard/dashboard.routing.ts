import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CockpitComponent } from './cockpit/cockpit.component';
import { AuthGuard } from '../auth.guard';
import { CoursesComponent } from './courses/courses.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'dashboard', component: CockpitComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/courses', component: CoursesComponent, canActivate: [AuthGuard] }
]);
