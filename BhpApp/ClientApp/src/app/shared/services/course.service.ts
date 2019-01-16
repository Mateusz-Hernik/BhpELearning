import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Course } from '../models/course.interface';
import { CourseInfo } from '../models/course-info.interface';
import { CourseNav } from '../models/course-nav.interface';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CourseService extends BaseService {

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }

    getAllCourses(): Observable<Course[]> {
        return this._http
            .get<Course[]>(this.baseUrl + '/courses', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getAllNavCourses(): Observable<CourseNav[]> {
        return this._http
            .get<CourseNav[]>(this.baseUrl + '/courses/navcourses', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getCourseInfoById(id: number): Observable<CourseInfo> {
        return this._http
            .get<CourseInfo>(this.baseUrl + '/courses/' + id, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
}
