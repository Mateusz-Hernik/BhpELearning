import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';
import { routing } from './dashboard.routing';
import { AuthGuard } from '../auth.guard';

import { ActivityComponent } from './activity/activity.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { CoursesComponent } from './courses/courses.component';
import { MessagesComponent } from './messages/messages.component';

import { DashboardService } from './shared/services/dashboard.service';
import { MessageService } from './shared/services/message.service';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    CockpitComponent,
    CoursesComponent,
    ActivityComponent,
    MessagesComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  providers: [
    AuthGuard,
    DashboardService,
    MessageService
  ]
})
export class DashboardModule { }
