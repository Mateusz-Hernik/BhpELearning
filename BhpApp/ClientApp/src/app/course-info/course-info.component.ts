import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../shared/services/course.service';
import { CourseInfo } from '../shared/models/course-info.interface';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  course: CourseInfo;

  constructor(private _courseService: CourseService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this._courseService.getCourseInfoById(params['id'])
        .subscribe((course: CourseInfo) => {
          this.course = course;
        });
    });
  }

}
