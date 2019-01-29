import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';
import { routing } from './dashboard.routing';
import { AuthGuard } from '../auth.guard';

import { ActivityComponent } from './activity/activity.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { CoursesComponent } from './courses/courses.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './message/message.component';
import { CourseComponent } from './course/course.component';
import { QuizComponent } from './quiz/quiz.component';

import { ActivityService } from './shared/services/activity.service';
import { DashboardService } from './shared/services/dashboard.service';
import { MessageService } from './shared/services/message.service';
import { QuizService } from './shared/services/quiz.service';

@NgModule({
  declarations: [
    CockpitComponent,
    CoursesComponent,
    ActivityComponent,
    MessagesComponent,
    MessageComponent,
    CourseComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  providers: [
    AuthGuard,
    ActivityService,
    DashboardService,
    MessageService,
    QuizService
  ]
})
export class DashboardModule { }
