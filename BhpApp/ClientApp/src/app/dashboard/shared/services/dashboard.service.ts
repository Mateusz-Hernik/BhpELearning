import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from "src/app/shared/services/base.service";
import { ConfigService } from 'src/app/shared/services/config.service';

@Injectable()
export class DashboardService extends BaseService {

    baseUrl = '';
    
    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }
    
}
