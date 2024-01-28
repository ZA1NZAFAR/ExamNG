import { Attachment } from './attachment';
import { Language } from './language';

/**
 * Represents the type of a question.
 */
export type QuestionType = 'mcq' | 'text' | 'code';

/**
 * Represents a question.
 * @property {string} id The unique identifier of the question.
 * @property {QuestionType} type The type of the question.
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
   * The type of the question.
   */
  type: QuestionType;
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
 * Represents a question that requires a text answer.
 * @extends Question
 * @property {'text'} type The type of the question. This is always 'text'.
 */
export type TextQuestion = Question & {
  /**
   * The type of the question. This is always 'text'.
   * @default 'text'
   */
  type: 'text';
}

/**
 * Represents a question that requires a code answer.
 * @extends Question
 * @property {'code'} type The type of the question. This is always 'code'.
 * @property {Language} defaultLanguage The default language of the code.
 * @property {string} [initialCode] The initial code for the question.
 */
export type CodeQuestion = Question & {
  /**
   * The type of the question. This is always 'code'.
   * @default 'code'
   */
  type: 'code';
  /**
   * The default language of the code question.
   */
  defaultLanguage: Language | null;
  /**
   * The initial code for the question.
   */
  initialCode?: string;
}


/**
 * Represents a multiple-choice option.
 * @property {string} statement The statement or text of the option.
 * @property {boolean} isCorrectOption Indicates whether the option is the correct answer.
 */
export type MCOption = {
  /**
   * The statement or text of the option.
   */
  statement: string;
  /**
   * Indicates whether the option is the correct answer.
   */
  isCorrectOption: boolean;
}


/**
 * Represents a multiple-choice question.
 * @extends Question
 * @property {'mcq'} type The type of the question. This is always 'mcq'.
 * @property {MCOption} options The options of the question.
 */
export type MCQuestion = Question & {
  /**
   * The type of the question. This is always 'mcq'.
   * @default 'mcq'
   */
  type: 'mcq';
  /**
   * The options of the question.
   */
  options: MCOption[];
}
