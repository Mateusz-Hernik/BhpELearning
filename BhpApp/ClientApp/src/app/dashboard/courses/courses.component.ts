import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../shared/services/dashboard.service';

import { Course } from 'src/app/shared/models/course.interface';
import { UserCourses } from '../shared/models/user-courses.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  incomingCourses: Course[] = [];
  activeCourses: Course[] = [];
  expiredCourses: Course[] = [];

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    this.getUserCourses();
  }

  getUserCourses() {
    this._dashboardService.getUserCourses(localStorage.getItem('user_name'))
      .subscribe((res: UserCourses) => {
        this.incomingCourses = res.incomingCourses;
        this.activeCourses = res.activeCourses;
        this.expiredCourses = res.expiredCourses;
      });
  }
}
