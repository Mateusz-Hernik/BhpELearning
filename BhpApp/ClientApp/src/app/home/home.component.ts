import { Component, OnInit } from '@angular/core';

import { CourseService } from '../shared/services/course.service';

import { Course } from '../shared/models/course.interface';

@Component({
  selector: 'bhp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: Course[];

  constructor(private _courseService: CourseService) { }

  ngOnInit() {
    this.courses = this._courseService.getAllCourses();
  }

}
