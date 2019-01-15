import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { ConfigService } from 'src/app/shared/services/config.service';

import { DashboardInfo } from '../models/dashboard-info.interface';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DashboardService extends BaseService {

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }

    getUserDashboardInfo(userName: string): Observable<DashboardInfo> {
        return this._http
            .get<DashboardInfo>(this.baseUrl + '/dashboard/info/' + userName, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

}
