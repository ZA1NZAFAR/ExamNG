import { Attachment } from '../attachment/attachment';

/**
 * Represents a question.
 * @property {string} id The unique identifier of the question.
 * @property {number} coefficient The coefficient of the question.
 * @property {string} statement The statement of the question.
 * @property {Attachment[]} attachments The attachments of the question.
 */
export type Question = {
  /**
   * The unique identifier of the question.
   */
  id: string;
  /**
   * The coefficient of the question.
   */
  coefficient: number;
  /**
   * The statement of the question.
   */
  statement: string;
  /**
   * The attachments of the question.
   */
  attachments: Attachment[];
}

/**
 * Represents a text question.
 * @extends Question
 * @property {boolean} isTextQuestion Indicates whether the question is a text question. This property is always true.
 */
export type TextQuestion = Question & {
  /**
   * Indicates whether the question is a text question. This property is always true.
   * @default true
   */
  isTextQuestion: true;
}


/**
 * Represents a multiple-choice option.
 * @property {string} statement The statement or text of the option.
 * @property {boolean} correctOption Indicates whether the option is the correct answer.
 */
export type MCOption = {
  /**
   * The statement or text of the option.
   */
  statement: string;
  /**
   * Indicates whether the option is the correct answer.
   */
  correctOption: boolean;
}


/**
 * Represents a multiple-choice question.
 * @extends Question
 * @property {MCOption} options The options of the question.
 */
export type MCQuestion = Question & {
  /**
   * The options of the question.
   */
  options: MCOption[];
}