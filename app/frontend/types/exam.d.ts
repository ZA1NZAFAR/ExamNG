import { Module } from './module';
import { Group } from './group';

/**
 * Represents an exam.
 * @property {string} id The unique identifier of the exam.
 * @property {string} description The description of the exam.
 * @property {Date} startDate The start date of the exam.
 * @property {Date} endDate The end date of the exam.
 * @property {boolean} isValidated Whether the exam is validated or not.
 * @property {boolean} isSubmitted Whether the exam is submitted or not.
 * @property {Object} summaryFields The summary fields of the exam.
 */
export type Exam = {
  /** The unique identifier of the exam. */
  id: string;
  /** The description of the exam. */
  description: string;
  /** The start date of the exam. */
  startDate: Date;
  /** The end date of the exam. */
  endDate: Date;
  /**
  * Whether the exam is validated or not.
  * @default false
  * */
  isValidated: boolean;
  /**
  * Whether the exam is submitted or not.
  * @default false
  * */
  isSubmitted: boolean;
  /**
  * The summary fields of the exam.
  * @readonly
  * */
  readonly summaryFields: {
    /**
    * The module of the exam.
    * @readonly
    * */
    readonly module: Readonly<Module>;
    /**
    * The student groups assigned to the exam.
    * @readonly
    * */
    readonly groups: Readonly<Group[]>;
    /**
    * The average score of the exam. It is a number between 0 and a defined maximum score.
    * Defined maximum score can be configured via environment variable.
    * @readonly
    * */
    readonly average?: number;
  };
}

