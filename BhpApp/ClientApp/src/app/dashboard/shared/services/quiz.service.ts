import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { ConfigService } from 'src/app/shared/services/config.service';

import { Answer } from '../models/answer.interface';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class QuizService extends BaseService {

    constructor(private _http: HttpClient, private _configService: ConfigService) {
        super();
        this.baseUrl = this._configService.getApiURI();
    }

    getAnswersFromLocalStorage(id: number): Answer[] {
        const answerItems = JSON.parse(localStorage.getItem('quiz_' + id + '_answers'));

        return answerItems == null ? [] : answerItems.answers;
    }

    setLocalStorageAnswers(answers: Answer[], id: number) {
        localStorage.setItem('quiz_' + id + '_answers', JSON.stringify({ answers: answers }));
    }

    deleteLocalStorageAnswers(id: number) {
        localStorage.removeItem('quiz_' + id + '_answers');
    }

    getQuestionIndexFromLocalStorage(): number {
        const quizItem = JSON.parse(localStorage.getItem('question_index'));

        return quizItem == null ? 0 : quizItem.index;
    }

    setLocalStorageQuestionIndex(questionIndex: number) {
        localStorage.setItem('question_index', JSON.stringify({ index: questionIndex }));
    }

    deleteLocalStorageQuestionIndex() {
        localStorage.removeItem('question_index');
    }

    getProgressbarValueFromLocalStorage(): number {
        const quizItem = JSON.parse(localStorage.getItem('progressbar_value'));

        return quizItem == null ? 0 : quizItem.pbvalue;
    }

    setLocalStorageProgressbarValue(progressbarValue: number) {
        localStorage.setItem('progressbar_value', JSON.stringify({ pbvalue: progressbarValue }));
    }

    deleteLocalStorageProgressbarValue() {
        localStorage.removeItem('progressbar_value');
    }
}
