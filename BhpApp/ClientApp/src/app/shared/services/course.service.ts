import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { CourseInfo } from '../models/course-info.interface';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CourseService extends BaseService {

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }

    getAllCourses(): Observable<CourseInfo[]> {
        return this._http
            .get<CourseInfo[]>(this.baseUrl + '/courses', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getCourseById(id: number) {
        return this._http
            .get(this.baseUrl + '/courses/' + id, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
}
