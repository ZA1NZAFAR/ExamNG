/**
 * Represents a code attachment.
 * @property {string} language - The language of the code.
 * @property {string} [code] - The code content.
 */
type CodeAttachment = {
  /**
   * The language of the code.
   */
  language: string;
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
type ImageAttachment = {
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


/**
 * Represents the properties for an attachment component.
 * @property {Attachment} attachment - The attachment to display.
 */
export type AttachmentProps = {
  attachment: Attachment;
}