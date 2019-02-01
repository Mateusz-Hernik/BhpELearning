import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivityService } from './activity.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { ConfigService } from 'src/app/shared/services/config.service';

import { ActivityInfo } from '../models/activity-info.interface';
import { UserInfo } from '../models/user-info.interface';
import { UserCourses } from '../models/user-courses.interface';
import { UserCourse } from '../models/user-course.interface';
import { Quiz } from '../models/quiz.interface';

import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DashboardService extends BaseService {

    userCourse$ = new Subject<UserCourse>();

    constructor(private _http: HttpClient,
        private _activityService: ActivityService,
        private _configService: ConfigService) {
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

    getActivityInfo(userName: string) {
        return this._http
            .get<ActivityInfo>(this.baseUrl + '/dashboard/activityinfo/' + userName, this.httpOptions)
            .pipe(
                map((res: ActivityInfo) => {
                    this._activityService.activityInfo$.next(res);
                }),
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

    sendUserCourse(course: UserCourse) {
        this.userCourse$.next(course);
    }

    getUserCourse(userName: string, courseId: number) {
        return this._http
            .get<UserCourse>(this.baseUrl + '/dashboard/usercourse/' + userName + '/' + courseId, this.httpOptions)
            .pipe(
                map((res: UserCourse) => {
                    this.userCourse$.next(res);
                }),
                catchError(this.handleError)
            );
    }

    getQuiz(id: number): Observable<Quiz> {
        return this._http
            .get<Quiz>(this.baseUrl + '/dashboard/quiz/' + id, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    checkAnswers(questionIds: number[], answers: string[]): Observable<number> {
        return this._http
            .post<number>(
                this.baseUrl + '/dashboard/checkquiz',
                JSON.stringify({ questionIds, answers }),
                this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    completeQuiz(userName: string, courseId: number, activityId: number): Observable<boolean> {
        return this._http
            .post<boolean>(
                this.baseUrl + '/dashboard/completequiz',
                JSON.stringify({ userName, courseId, activityId }),
                this.httpOptions)
            .pipe(
                map(res => {
                    return true;
                }),
                catchError(this.handleError)
            );
    }
}
