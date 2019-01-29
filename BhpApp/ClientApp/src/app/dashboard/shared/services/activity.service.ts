import { Injectable } from '@angular/core';

import { ActivityInfo } from '../models/activity-info.interface';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class ActivityService {
    private activityInfo = new Subject<ActivityInfo>();

    sendActivityInfo(activityInfo: ActivityInfo) {
        this.activityInfo.next(activityInfo);
    }

    getactivitySubject(): Observable<ActivityInfo> {
        return this.activityInfo.asObservable();
    }
}
