/**
 * Represents a module.
 * @property {string} code The code of the module.
 * @property {string} name The name of the module.
 * @property {string} description The description of the module.
 * @property {string} imageURL The image URL of the module.
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
  description: string;
  /**
   * The image URL of the module.
   */
  imageURL: string;
}
