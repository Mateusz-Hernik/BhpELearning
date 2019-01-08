import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';
import { routing } from './dashboard.routing';
import { CockpitComponent } from './cockpit/cockpit.component';
import { AuthGuard } from '../auth.guard';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [CockpitComponent, CoursesComponent],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  providers: [AuthGuard]
})
export class DashboardModule { }
