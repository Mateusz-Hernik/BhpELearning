import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from '../shared/services/dashboard.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(
    private _dashboardService: DashboardService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  loadCourse() {
    
  }

}
