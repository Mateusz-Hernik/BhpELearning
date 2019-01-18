import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { CockpitComponent } from './cockpit/cockpit.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'dashboard', component: CockpitComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/courses', component: CoursesComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/courses/:id', component: CourseComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/messages', component: MessagesComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/messages/:id', component: MessageComponent, canActivate: [AuthGuard] }
]);
