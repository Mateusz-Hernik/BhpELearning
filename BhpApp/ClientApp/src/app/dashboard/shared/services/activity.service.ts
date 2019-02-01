import { Injectable } from '@angular/core';

import { ActivityInfo } from '../models/activity-info.interface';

import { Subject } from 'rxjs';

@Injectable()
export class ActivityService {
    activityInfo$ = new Subject<ActivityInfo>();

    sendActivityInfo(activityInfo: ActivityInfo) {
        this.activityInfo$.next(activityInfo);
    }
}
