import { Question } from './question';

/**
 * This represents the answers of a student.
 * It contains the answers of a question.
 * @property {string} answer - The answer of the question.
 * @property {boolean} [correct] - The correctness of the answer.
 * @property {Question} [question] - The question.
 * */
export type Answer = {
  /** The answer of the question */
  answer: string | string[];
  /** The correctness of the answer */
  correct?: boolean;
  /**
   * The question.
   * @readonly:
   * */
  readonly question?: Readonly<Question>;
}

/**
 * This represents the answer sheet of a student.
 * It contains the exam id and the answers of the student.
 * @property {string} examId - The id of the exam.
 * @property {Object} summaryFields - The summary fields of the answer sheet.
 * */

export type AnswerSheet = {
  /** The id of the exam. */
  examId: string;
  answers: Map<string, Answer>;
  /**
  * The summary fields of the answer sheet.
  * @readonly
  * */
  readonly summaryFields: {
    /**
    * The total score of the answer sheet.
    * @readonly
    * */
    readonly totalScore: number;
  }
}
