import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from '../shared/services/dashboard.service';
import { QuizService } from '../shared/services/quiz.service';

import { Answer } from '../shared/models/answer.interface';
import { Quiz } from '../shared/models/quiz.interface';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  courseId: number;
  quiz: Quiz;
  questionIndex: number;
  answers: Answer[];
  progressBarValue: number;
  quizCompleted: boolean;
  correctAnswers: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dashboardService: DashboardService,
    private _messageService: MessageService,
    private _quizService: QuizService) { }

  ngOnInit() {
    this.loadQuiz();
    this.initializeAnswers();
  }

  loadQuiz() {
    this._activatedRoute.params.subscribe(params => {
      this.courseId = params['id'];
      this._dashboardService.getQuiz(params['id2'])
        .subscribe((res: Quiz) => {
          this.quiz = res;
        });
    });
  }

  endQuiz() {
    this.deleteQuizDataFromLocalStorage();
  }

  retryQuiz() {
    this.deleteQuizDataFromLocalStorage();
    this.initializeAnswers();
    this.correctAnswers = 0;
    this.quizCompleted = false;
  }

  saveQuizProgress() {
    this.deleteQuizDataFromLocalStorage();
    this.saveQuizIsCompleted();
    this.sendCompleteTestMessage();
  }

  saveQuizIsCompleted() {
    this._activatedRoute.params.subscribe(params => {
      this._dashboardService.completeQuiz(localStorage.getItem('user_name'), params['id'], params['id2'])
        .subscribe((res: boolean) => {
          if (res) { console.log('Quiz completed'); }
        });
    });
  }

  sendCompleteTestMessage() {
    this._messageService.sendCompleteTestMessage(
      'Administrator',
      localStorage.getItem('user_name'),
      'Ukończenie testu ' + this.quiz.name,
      // tslint:disable-next-line:max-line-length
      'Gratulujemy ukończenia testu ' + this.quiz.name + '. Twój wynik to ' + this.correctAnswers + ' punktów na ' + this.quiz.questionAmount + ' możliwych. Życzymy powodzenia w następnych lekacjach tego kursu.')
        .subscribe((res: boolean) => {
          if (res) { console.log('Message has been sent'); }
        });
  }

  initializeAnswers() {
    this.progressBarValue = this._quizService.getProgressbarValueFromLocalStorage();
    console.log(this.progressBarValue);
    this.questionIndex = this._quizService.getQuestionIndexFromLocalStorage();
    console.log(this.questionIndex);
    this.answers = this._quizService.getAnswersFromLocalStorage(this.courseId);
    console.log(this.answers);
    this.checkAnswers(this.questionIndex);
    console.log('after loads data from localstorage');
    console.log(this.questionIndex);
    console.log(this.answers);
  }

  completeQuiz() {
    this.quizCompleted = true;

    this._dashboardService.checkAnswers(this.quiz.questions.map(x => x.id), this.answers.map(x => x.answer))
      .subscribe((res: number) => {
        this.correctAnswers = res;
      });

    if (this.correctAnswers >= this.quiz.passCondition) {
      console.log('Passed');
    } else {
      console.log('Not passed');
    }
  }

  checkAnswers(index: number) {
    const item = this.answers.findIndex(x => x.question === index);

    if (item === -1) {
      this.addAnswer(index);
    }
  }

  addAnswer(index: number) {
    this.answers.push({
      answer: '',
      isConfirmed: false,
      isFirstChecked: false,
      isFourthChecked: false,
      isSecondChecked: false,
      isThirdChecked: false,
      question: index}
    );
  }

  getCourseId(): number {
    return this.courseId;
  }

  isNextQuestionAvaiable() {
    if (this.quiz) {
      if (this.questionIndex < this.quiz.questionAmount - 1) {
        return true;
      }
      return false;
    }
  }

  isPrevQuestionAvaiable() {
    if (this.questionIndex > 0) {
      return true;
    }
    return false;
  }

  setNextQuestion() {
    if (this.isNextQuestionAvaiable()) {
      this.questionIndex++;
      this.checkAnswers(this.questionIndex);
      this.saveQuizDataToLocalStorage();
    }
  }

  setPreviousQuestion() {
    if (this.isPrevQuestionAvaiable()) {
      this.questionIndex--;
      this.saveQuizDataToLocalStorage();
    }
  }

  saveQuizDataToLocalStorage() {
    this._quizService.setLocalStorageAnswers(this.answers, this.courseId);
    this._quizService.setLocalStorageQuestionIndex(this.questionIndex);
    this._quizService.setLocalStorageProgressbarValue(this.progressBarValue);
  }

  deleteQuizDataFromLocalStorage() {
    this._quizService.deleteLocalStorageAnswers(this.courseId);
    this._quizService.deleteLocalStorageQuestionIndex();
    this._quizService.deleteLocalStorageProgressbarValue();
  }

  resetQuestion(index: number) {
    this.answers[index].isFirstChecked =
    this.answers[index].isSecondChecked =
    this.answers[index].isThirdChecked =
    this.answers[index].isFourthChecked =
    this.answers[index].isConfirmed = false;
    this.answers[index].answer = '';

    this.decreaseProgressBarValue();
  }

  acceptQuestion(index: number) {
    this.answers[index].isConfirmed = true;
    this.increaseProgressBarValue();
    this.saveQuizDataToLocalStorage();
  }

  increaseProgressBarValue() {
    this.progressBarValue += (100 / this.quiz.questionAmount);
  }

  decreaseProgressBarValue() {
    this.progressBarValue -= (100 / this.quiz.questionAmount);
  }

  changeFirstCheck(index: number) {
    this.answers[index].isFirstChecked = !this.answers[index].isFirstChecked;
    this.answers[index].isSecondChecked = false;
    this.answers[index].isThirdChecked = false;
    this.answers[index].isFourthChecked = false;

    if (this.answers[index].isFirstChecked) {
      this.answers[index].answer = this.quiz.questions[index].firstAnswer;
    } else {
      this.answers[index].answer = '';
    }
  }

  changeSecondCheck(index: number) {
    this.answers[index].isSecondChecked = !this.answers[index].isSecondChecked;
    this.answers[index].isFirstChecked = false;
    this.answers[index].isThirdChecked = false;
    this.answers[index].isFourthChecked = false;

    if (this.answers[index].isSecondChecked) {
      this.answers[index].answer = this.quiz.questions[index].secondAnswer;
    } else {
      this.answers[index].answer = '';
    }
  }

  changeThirdCheck(index: number) {
    this.answers[index].isThirdChecked = !this.answers[index].isThirdChecked;
    this.answers[index].isFirstChecked = false;
    this.answers[index].isSecondChecked = false;
    this.answers[index].isFourthChecked = false;

    if (this.answers[index].isThirdChecked) {
      this.answers[index].answer = this.quiz.questions[index].thirdAnswer;
    } else {
      this.answers[index].answer = '';
    }
  }

  changeFourthCheck(index: number) {
    this.answers[index].isFourthChecked = !this.answers[index].isFourthChecked;
    this.answers[index].isFirstChecked = false;
    this.answers[index].isSecondChecked = false;
    this.answers[index].isThirdChecked = false;

    if (this.answers[index].isFourthChecked) {
      this.answers[index].answer = this.quiz.questions[index].fourthAnswer;
    } else {
      this.answers[index].answer = '';
    }
  }

  isQuizCompleted(): boolean {
    let counter = 0;

    for (const answer of this.answers) {
      if (answer.isConfirmed && answer.answer !== '') {
        ++counter;
      }
    }

    if (this.quiz) {
      if (counter === this.quiz.questionAmount) {
        return true;
      }
    }

    return false;
  }
}
