import { Component, OnInit } from '@angular/core';

import { CourseShop } from '../shared/models/course-shop.interface';

import { ShopCartService } from '../shared/services/shop-cart.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  courses: CourseShop[];
  totalCost: 0.00;

  constructor(private _shopCartService: ShopCartService) { }

  ngOnInit() {
    this.initializeShopCart();
  }

  initializeShopCart() {
    this.courses = this._shopCartService.getOrderedCourses();
    this.calculateTotalCost();
  }

  calculateTotalCost() {
    this.totalCost = 0.00;

    for (const course of this.courses) {
      this.totalCost += (course.amount * course.price);
    }
  }

  removeFromShopCart(courseId: number) {
    this._shopCartService.removeCourseFromShopCart(courseId);
    this.initializeShopCart();
  }

  decreaseCourseAmount(courseId: number) {
    const res = this._shopCartService.decreaseCourseAmountInShopCart(courseId);

    if (res) {
      this.initializeShopCart();
    }
  }

  increaseCourseAmount(courseId: number) {
    this._shopCartService.increaseCourseAmountInShopCart(courseId);
    this.initializeShopCart();
  }

}
