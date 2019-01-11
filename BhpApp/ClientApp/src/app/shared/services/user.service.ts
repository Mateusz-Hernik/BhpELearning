import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { ConfigService } from './config.service';

import { BehaviorSubject, Observable } from 'rxjs';

// Add the RxJS Observable operators we need in this app.
import { map, catchError } from 'rxjs/operators';
import { Token } from '../models/token.interface';
import { Router } from '@angular/router';

@Injectable()
export class UserService extends BaseService {

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);

    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;

    constructor(private _http: HttpClient, private _configService: ConfigService, private _router: Router) {
        super();
        this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
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
                    this.loggedIn = true;
                    this._authNavStatusSource.next(true);

                    return true;
                }),
                catchError(this.handleError)
            );
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);

        // go to home page
        this._router.navigate(['/']);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
