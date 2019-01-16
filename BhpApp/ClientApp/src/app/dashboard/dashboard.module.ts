import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';

import { CockpitComponent } from './cockpit/cockpit.component';
import { CoursesComponent } from './courses/courses.component';

import { routing } from './dashboard.routing';
import { AuthGuard } from '../auth.guard';
import { DashboardService } from './shared/services/dashboard.service';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
  declarations: [
    CockpitComponent,
    CoursesComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  providers: [
    AuthGuard,
    DashboardService
  ]
})
export class DashboardModule { }
