import { Language } from './question';

/**
 * Represents a code attachment.
 * @property {Language} language - The language of the code.
 * @property {string} [code] - The code content.
 */
export type CodeAttachment = {
  /**
   * The language of the code.
   */
  language: Language;
  /**
   * The code content.
   */
  code?: string;
}
/**
 * Represents an image attachment.
 * @property {string} imageUrl - The URL of the image.
 * @property {string} [description] - The description of the image.
 */
export type ImageAttachment = {
  /**
   * The URL of the image.
   */
  imageUrl: string;
  /**
   * The description of the image.
   */
  description?: string;
}

/**
 * Represents an attachment for a question.
 * It can be either a code attachment or an image attachment.
 */
export type Attachment = CodeAttachment | ImageAttachment;
