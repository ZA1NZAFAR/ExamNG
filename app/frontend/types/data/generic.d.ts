/**
 * Data structure for a result of a paginated query.
 * @template T The type of the content.
 * @property {number} totalElements The total number of content.
 * @property {number} size The page size.
 * @property {number} number The current page.
 * @property {T[]} content The content of the query.
 */
export type PageResult<T> = {
  /** The total number of content. */
  totalElements: number;
  /** The page size. */
  size: number;
  /** The current page. */
  number: number;
  /** The content of the query. */
  content: T[];
}

/**
 * Utility type to remove the summaryFields property from a type.
 * Only used for any type that has a summaryFields property.
 * Also renders the type readonly.
 * @template T The type to remove the summaryFields property from.
 * */
export type Summary<T> = Readonly<Omit<T, 'summaryFields'>>; 
