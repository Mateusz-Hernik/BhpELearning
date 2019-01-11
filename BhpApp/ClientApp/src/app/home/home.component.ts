import { Component, OnInit } from '@angular/core';

import { CourseService } from '../shared/services/course.service';

import { CourseInfo } from '../shared/models/course-info.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: CourseInfo[];

  constructor(private _courseService: CourseService) { }

  ngOnInit() {
    this._courseService.getAllCourses()
      .subscribe((courses: CourseInfo[]) => {
        this.courses = courses;
      });
  }

}
