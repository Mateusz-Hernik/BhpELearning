import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../shared/services/dashboard.service';

import { ActivityInfo } from '../shared/models/activity-info.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activityInfo: ActivityInfo;

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    this.getActivityInfo();
  }

  getActivityInfo() {
    this._dashboardService.getActivityInfo(localStorage.getItem('user_name'))
      .subscribe((info: ActivityInfo) => {
        this.activityInfo = info;
      });
  }

}
