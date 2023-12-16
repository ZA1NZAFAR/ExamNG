/**
 * Represents an exam.
 * @property {string} id The unique identifier of the exam.
 * @property {string} description The description of the exam.
 * @property {Date} startDate The start date of the exam.
 * @property {Date} endDate The end date of the exam.
 * @property {boolean} isValidated Whether the exam is validated or not.
 * @property {boolean} isSubmitted Whether the exam is submitted or not.
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
}

