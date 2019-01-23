import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from '../shared/services/dashboard.service';

import { UserCourse } from '../shared/models/user-course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course: UserCourse;

  constructor(
    private _dashboardService: DashboardService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadCourse();
  }

  loadCourse() {
    this._activatedRoute.params.subscribe(params => {
      this._dashboardService.getUserCourse(localStorage.getItem('user_name'), params['id'])
        .subscribe((res: UserCourse) => {
          this.course = res;
        });
    });
  }

}
