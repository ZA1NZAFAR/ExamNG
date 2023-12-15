import { Question } from './question';

/**
 * Represents a module.
 * @property {string} code The code of the module.
 * @property {string} name The name of the module.
 * @property {string} description The description of the module.
 */
export type Module = {
  /**
   * The code of the module.
   */
  code: string;
  /**
   * The name of the module.
   */
  name: string;
  /**
   * The description of the module.
   */
  description?: string;
}

/**
 * Represents an exam.
 * @property {string} id The unique identifier of the exam.
 * @property {string} name The name of the exam.
 * @property {number} duration The duration of the exam in minutes.
 * @property {Date} startDate The start date of the exam.
 * @property {Date} endDate The end date of the exam.
 * @property {Question[]} questions The list of questions in the exam.
 */
export type Exam = {
  /**
   * The unique identifier of the exam.
   */
  id: string;
  /**
   * The name of the exam.
   */
  name: string;
  /**
   * The duration of the exam in minutes.
   */
  duration: number;
  /**
   * The start date of the exam.
   */
  startDate: Date;
  /**
   * The end date of the exam.
   */
  endDate: Date;
  /**
   * The list of questions in the exam.
   */
  questions: Question[];
}