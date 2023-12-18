/**
 * This represents the base options for a paginated query.
 * @property {number} page The page number.
 * @property {number} pageSize The page size.
 */
export type PageOptions = {
  /** The page number. */
  page: number;
  /** The page size. */
  pageSize: number;
};
