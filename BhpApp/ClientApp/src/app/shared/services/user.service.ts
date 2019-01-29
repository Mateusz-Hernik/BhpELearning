import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { ShopCartService } from './shop-cart.service';

import { Token } from '../models/token.interface';

// Add the RxJS Observable operators we need in this app.
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserService extends BaseService {

    // Observable navItem login status
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();

    // Observable navItem source
    private _authNavUserNameSource = new BehaviorSubject<string>('');
    authNavUserName$ = this._authNavUserNameSource.asObservable();

    private loggedIn = false;

    constructor(
        private _http: HttpClient,
        private _configService: ConfigService,
        private _shopCartService: ShopCartService,
        private _router: Router
        ) {
        super();
        this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
        this._authNavUserNameSource.next(localStorage.getItem('user_name'));
        this.baseUrl = this._configService.getApiURI();
    }

    register(name: string, surname: string, email: string, password: string): Observable<boolean> {
        return this._http
            .post(
                this.baseUrl + '/account/register',
                JSON.stringify({ name, surname, email, password }),
                this.httpOptions)
            .pipe(
                map(res => true),
                catchError(this.handleError)
            );
    }

    login(email: string, password: string): Observable<boolean> {
        return this._http
            .post(
                this.baseUrl + '/auth/login',
                JSON.stringify({ email, password }),
                this.httpOptions)
            .pipe(
                map((res: Token) => {
                    localStorage.setItem('auth_token', res.auth_token);
                    localStorage.setItem('user_name', res.user_name);
                    this.loggedIn = true;
                    this._authNavStatusSource.next(true);
                    this._authNavUserNameSource.next(res.user_name);

                    return true;
                }),
                catchError(this.handleError)
            );
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_name');
        localStorage.removeItem('shop_courses');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
        this._authNavUserNameSource.next('');
        this._shopCartService.setShopCartAmount(0);

        // go to home page
        this._router.navigate(['/']);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
