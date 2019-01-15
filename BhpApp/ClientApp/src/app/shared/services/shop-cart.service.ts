import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';

import { Course } from '../models/course.interface';
import { CourseShop } from '../models/course-shop.interface';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShopCartService extends BaseService {

    // Observable navItem source
    private _shopCartAmount = new BehaviorSubject<number>(0);
    shopCartAmountStatus$ = this._shopCartAmount.asObservable();

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
        this._shopCartAmount.next(this.getAmountOfCourses());
    }

    getOrderedCourses(): CourseShop[] {
        return this.getCoursesFromLocalStorage();
    }

    setShopCartAmount(newvalue: number) {
        this._shopCartAmount.next(newvalue);
    }

    addCourseToShopCart(course: Course) {
        const courses = this.getCoursesFromLocalStorage();
        const index = courses.findIndex(x => x.id === course.id);

        if (index === -1) {
            courses.push(this.convertToCourseShop(course));
        } else {
            courses[index].amount++;
        }

        this.setLocalStorageCourses(courses);
        this._shopCartAmount.next(this.getAmountOfCourses());
    }

    removeCourseFromShopCart(courseId: number) {
        let courses = this.getCoursesFromLocalStorage();
        courses = courses.filter(x => x.id !== courseId);

        this.setLocalStorageCourses(courses);
        this._shopCartAmount.next(this.getAmountOfCourses());
    }

    increaseCourseAmountInShopCart(courseId: number) {
        const courses = this.getCoursesFromLocalStorage();
        const index = courses.findIndex(x => x.id === courseId);

        if (index !== -1) {
            courses[index].amount++;
        }

        this.setLocalStorageCourses(courses);
        this._shopCartAmount.next(this.getAmountOfCourses());
    }

    decreaseCourseAmountInShopCart(courseId: number): boolean {
        const courses = this.getCoursesFromLocalStorage();
        const index = courses.findIndex(x => x.id === courseId);

        if (index !== -1 && courses[index].amount > 1) {
            courses[index].amount--;

            this.setLocalStorageCourses(courses);
            this._shopCartAmount.next(this.getAmountOfCourses());

            return true;
        } else if (index !== -1 && courses[index].amount > 0) {
            this.removeCourseFromShopCart(courseId);

            return true;
        }

        return false;
    }

    getAmountOfCourses(): number {
        let amount = 0;
        const courses = this.getCoursesFromLocalStorage();

        for (const course of courses) {
            amount += course.amount;
        }

        return amount;
    }

    private getCoursesFromLocalStorage(): CourseShop[] {
        const courseItems = JSON.parse(localStorage.getItem('shop_courses'));

        return courseItems == null ? [] : courseItems.courses;
    }

    private setLocalStorageCourses(courses: CourseShop[]) {
        localStorage.setItem('shop_courses', JSON.stringify({ courses: courses }));
    }

    private convertToCourseShop(course: Course): CourseShop {
        const courseShopItem: CourseShop = {
            id: course.id,
            name: course.name,
            price: course.price,
            startDate: course.startDate,
            endDate: course.endDate,
            photo: course.photo,
            amount: 1
        };

        return courseShopItem;
    }
}
