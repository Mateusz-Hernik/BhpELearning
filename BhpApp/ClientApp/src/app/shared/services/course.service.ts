import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Course } from '../models/course.interface';

import { catchError } from 'rxjs/operators';

@Injectable()
export class CourseService extends BaseService {

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }

    getAllCourses(): Course[] {
        return this._http
            .get(this.baseUrl + '/courses/all', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
}
