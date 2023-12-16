/**
 * Data structure for a result of a paginated query.
 * @template T The type of the results.
 * @property {number} count The total number of results.
 * @property {number} pageSize The page size.
 * @property {number} currentPage The current page.
 * @property {T[]} results The results of the query.
 */
export type Result<T> = {
  /** The total number of results. */
  count: number;
  /** The page size. */
  pageSize: number;
  /** The current page. */
  currentPage: number;
  /** The results of the query. */
  results: T[];
}
