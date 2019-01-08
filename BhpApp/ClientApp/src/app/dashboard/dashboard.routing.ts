import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CockpitComponent } from './cockpit/cockpit.component';
import { AuthGuard } from '../auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'dashboard', component: CockpitComponent, canActivate: [AuthGuard] }
]);