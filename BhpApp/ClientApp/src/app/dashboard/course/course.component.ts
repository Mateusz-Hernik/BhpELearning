import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from '../shared/services/dashboard.service';

import { UserCourse } from '../shared/models/user-course.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {

  course: UserCourse;
  curseSubscription: Subscription;

  constructor(
    private _dashboardService: DashboardService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadCourse();
    this.curseSubscription = this._dashboardService.userCourse$.subscribe(res => { this.course = res; });
  }

  loadCourse() {
    this._activatedRoute.params.subscribe(params => {
      this._dashboardService.getUserCourse(localStorage.getItem('user_name'), params['id'])
        .subscribe();
    });
  }

  ngOnDestroy() {
    if (this.curseSubscription) {
      this.curseSubscription.unsubscribe();
    }
  }

}
