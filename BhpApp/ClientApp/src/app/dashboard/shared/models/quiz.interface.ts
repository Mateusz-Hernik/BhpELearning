import { Question } from './question.interface';

export interface Quiz {
    id: number;
    name: string;
    questionAmount: number;
    passCondition: number;
    questions: Question[];
}
