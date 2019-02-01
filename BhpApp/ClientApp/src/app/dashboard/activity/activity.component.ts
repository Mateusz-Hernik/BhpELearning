import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivityService } from '../shared/services/activity.service';
import { DashboardService } from '../shared/services/dashboard.service';

import { ActivityInfo } from '../shared/models/activity-info.interface';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {

  activityInfo: ActivityInfo;
  activityInfoSubscription: Subscription;

  constructor(private _activityService: ActivityService,
    private _dashboardService: DashboardService) { }

  ngOnInit() {
    this.getActivityInfo();
    this.activityInfoSubscription = this._activityService.activityInfo$.subscribe(res => { this.activityInfo = res; });
  }

  getActivityInfo() {
    this._dashboardService.getActivityInfo(localStorage.getItem('user_name'))
      .subscribe();
  }

  ngOnDestroy() {
    if (this.activityInfoSubscription) {
      this.activityInfoSubscription.unsubscribe();
    }
  }

}
