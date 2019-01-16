import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseService } from '../shared/services/course.service';
import { ShopCartService } from '../shared/services/shop-cart.service';
import { UserService } from '../shared/services/user.service';

import { CourseNav } from '../shared/models/course-nav.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy  {

  status: boolean;
  statusSubscription: Subscription;
  userName: string;
  userNameSubscription: Subscription;
  cartOrderAmount: number;
  shopCartAmountSubscription: Subscription;
  courses: CourseNav[];

  constructor(
    private _userService: UserService,
    private _coursesService: CourseService,
    private _shopCartService: ShopCartService) { }

  ngOnInit() {
    this.getNavCourseElements();
    this.statusSubscription = this._userService.authNavStatus$.subscribe(status => this.status = status);
    this.userNameSubscription = this._userService.authNavUserName$.subscribe(user => this.userName = user);
    this.shopCartAmountSubscription = this._shopCartService.shopCartAmountStatus$.subscribe(amount => this.cartOrderAmount = amount);
  }

  getNavCourseElements() {
    this._coursesService.getAllNavCourses()
      .subscribe((navCourses: CourseNav[]) => {
        this.courses = navCourses;
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.statusSubscription.unsubscribe();
    this.userNameSubscription.unsubscribe();
    this.shopCartAmountSubscription.unsubscribe();
  }

  logout() {
    this._userService.logout();
  }

}
