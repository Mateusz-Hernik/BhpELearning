import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../shared/services/dashboard.service';

import { UserInfo } from '../shared/models/user-info.interface';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  userInfo: UserInfo;

  constructor(
    private _dashboardService: DashboardService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this._dashboardService.getUserInfo(localStorage.getItem('user_name'))
    .subscribe((info: UserInfo) => {
      this.userInfo = info;
    });
  }

}
