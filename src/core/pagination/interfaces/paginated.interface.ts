/**
 * Interface for paginated data
 */
export interface Paginated<T> {
  /** Paginated data. */
  data: T[];

  /** Pagination metadata. */
  meta: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };

  /** Pagination links. */
  links: {
    previous: string;
    next: string;
    current: string;
    first: string;
    last: string;
  };
}
