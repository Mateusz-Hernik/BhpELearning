import { Component, OnInit } from '@angular/core';

import { CourseService } from '../shared/services/course.service';
import { ShopCartService } from '../shared/services/shop-cart.service';

import { Course } from '../shared/models/course.interface';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: Course[];

  constructor(
    private _courseService: CourseService,
    private _shopCartService: ShopCartService) { }

  ngOnInit() {
    this._courseService.getAllCourses()
      .subscribe((courses: Course[]) => {
        this.courses = courses;
      });
  }

  addToCart(course: Course) {
    this._shopCartService.addCourseToShopCart(course);
  }

}
