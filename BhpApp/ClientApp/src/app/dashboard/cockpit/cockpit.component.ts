import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../shared/services/dashboard.service';

import { DashboardInfo } from '../shared/models/dashboard-info.interface';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  dashboardInfo: DashboardInfo;

  constructor(
    private _dashboardService: DashboardService) {
      this._dashboardService.getUserDashboardInfo(localStorage.getItem('user_name'))
        .subscribe((info: DashboardInfo) => {
          this.dashboardInfo = info;
        });
  }

  ngOnInit() {
  }

}
