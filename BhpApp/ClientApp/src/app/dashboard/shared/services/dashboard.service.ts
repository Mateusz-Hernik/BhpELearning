import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { ConfigService } from 'src/app/shared/services/config.service';

import { ActivityInfo } from '../models/activity-info.interface';
import { UserInfo } from '../models/user-info.interface';
import { UserCourses } from '../models/user-courses.interface';
import { UserCourse } from '../models/user-course.interface';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DashboardService extends BaseService {

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }

    getUserInfo(userName: string): Observable<UserInfo> {
        return this._http
            .get<UserInfo>(this.baseUrl + '/dashboard/userinfo/' + userName, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getActivityInfo(userName: string): Observable<ActivityInfo> {
        return this._http
            .get<ActivityInfo>(this.baseUrl + '/dashboard/activityinfo/' + userName, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getUserCourses(userName: string): Observable<UserCourses> {
        return this._http
            .get<UserCourses>(this.baseUrl + '/courses/usercourses/' + userName, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getUserCourse(userName: string, courseId: number): Observable<UserCourse> {
        return this._http
            .get<UserCourse>(this.baseUrl + '/dashboard/usercourse/' + userName + '/' + courseId, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
}
