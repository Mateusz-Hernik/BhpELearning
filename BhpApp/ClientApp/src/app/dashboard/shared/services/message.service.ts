import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { ConfigService } from 'src/app/shared/services/config.service';

import { Message } from '../models/message.interface';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MessageService extends BaseService {

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }

    getAllUserMessages(userName: string): Observable<Message[]> {
        return this._http
            .get<Message[]>(this.baseUrl + '/messages/all/' + userName, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getMessage(id: number): Observable<Message> {
        return this._http
            .get<Message>(this.baseUrl + '/messages/' + id, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteMessage(id: number) {
        return this._http
            .delete(this.baseUrl + '/messages/' + id, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    changeMessageReadStatus(id: number) {
        return this._http
            .get(this.baseUrl + '/messages/changestatus/' + id, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    sendCompleteTestMessage(sendFrom: string, sendTo: string, title: string, message: string) {
        return this._http
            .post<boolean>(
                this.baseUrl + '/messages/sendmessage',
                JSON.stringify({ sendFrom, sendTo, title, message }),
                this.httpOptions)
            .pipe(
                map(res => {
                    return true;
                }),
                catchError(this.handleError)
            );
    }
}
