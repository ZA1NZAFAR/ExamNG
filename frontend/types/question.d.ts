import { Attachment } from '../attachment/attachment';

/**
 * Represents a question.
 * @property {string} id The unique identifier of the question.
 * @property {string} statement The statement of the question.
 * @property {Attachment[]} attachments The attachments of the question.
 * @property {number} coefficient The coefficient of the question.
 */
export type Question = {
  /**
   * The unique identifier of the question.
   */
  id: string;
  /**
   * The statement of the question.
   */
  statement: string;
  /**
   * The attachments of the question.
   */
  attachments: Attachment[];
  /**
   * The coefficient of the question.
   */
  coefficient: number;
}


/**
 * Represents a multiple-choice option.
 * @property {string} statement The statement or text of the option.
 * @property {boolean} correctOption Indicates whether the option is the correct answer.
 */
type MCOption = {
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


/**
 * Represents the properties of a question component.
 * @property {number} id The unique identifier of the question.
 * @property {Question} question The question.
 */
export type QuestionProps = {
  id: number;
  question: Question;
}

/**
 * Represents the properties of an option component.
 * @property {MCOption} option The option.
 */
export type OptionProps = {
  option: MCOption;
}